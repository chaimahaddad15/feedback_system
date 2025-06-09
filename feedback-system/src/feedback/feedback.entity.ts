import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@ObjectType()
@Entity()
export class Feedback {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => Int)
  @Column()
  rating: number;

  @Field()
  @Column()
  comment: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.feedbacks)
  user: User;

  @Field(() => Product)
  @ManyToOne(() => Product, product => product.feedbacks)
  product: Product;
}
