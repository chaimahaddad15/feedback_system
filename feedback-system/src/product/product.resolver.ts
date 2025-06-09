import { Resolver, Query, Mutation, Args, ResolveField, Parent, Int } from '@nestjs/graphql';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { Feedback } from '../feedback/feedback.entity';
import { FeedbackService } from '../feedback/feedback.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly feedbackService: FeedbackService,
  ) {}

  @Query(() => [Product])
  products() {
    return this.productService.findAll();
  }

  @Mutation(() => Product)
  createProduct(
    @Args('name') name: string,
    @Args('description', { nullable: true }) description?: string,
  ) {
    return this.productService.create({ name, description });
  }

  // ✅ Feedbacks du produit
  @ResolveField(() => [Feedback])
  feedbacks(@Parent() product: Product) {
    return this.feedbackService.getByProductId(product.id);
  }

  // ✅ Moyenne des notes
  @ResolveField(() => Number, { name: 'averageRating', nullable: true })
  averageRating(@Parent() product: Product) {
    return this.feedbackService.getAverageRatingByProduct(product.id);
  }
}
