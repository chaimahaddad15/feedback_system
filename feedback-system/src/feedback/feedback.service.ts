import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback) private feedbackRepo: Repository<Feedback>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll(): Promise<Feedback[]> {
    return this.feedbackRepo.find({ relations: ['user', 'product'] });
  }

  async create(
    rating: number,
    comment: string,
    userId: number,
    productId: number,
  ): Promise<Feedback> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const product = await this.productRepo.findOne({ where: { id: productId } });

    if (!user || !product) {
      throw new Error('User or Product not found');
    }

    const feedback = this.feedbackRepo.create({ rating, comment, user, product });
    return this.feedbackRepo.save(feedback);
  }

  // ✅ Récupérer les feedbacks d’un produit
  async getByProductId(productId: number): Promise<Feedback[]> {
    return this.feedbackRepo.find({
      where: { product: { id: productId } },
      relations: ['user', 'product'],
    });
  }

  // ✅ Récupérer la note moyenne d’un produit
  async getAverageRatingByProduct(productId: number): Promise<number | null> {
    const result = await this.feedbackRepo
      .createQueryBuilder('feedback')
      .select('AVG(feedback.rating)', 'avg')
      .where('feedback.productId = :productId', { productId })
      .getRawOne();

    return result?.avg ? parseFloat(result.avg) : null;
  }
}
