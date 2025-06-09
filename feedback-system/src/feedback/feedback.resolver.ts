import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Query(() => [Feedback])
  feedbacks() {
    return this.feedbackService.findAll();
  }

  @Mutation(() => Feedback)
  createFeedback(
    @Args('rating', { type: () => Int }) rating: number,
    @Args('comment') comment: string,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('productId', { type: () => Int }) productId: number,
  ) {
    return this.feedbackService.create(rating, comment, userId, productId);
  }
}
