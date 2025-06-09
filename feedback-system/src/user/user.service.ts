import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  create(user: Partial<User>): Promise<User> {
    return this.repo.save(user);
  }
}
