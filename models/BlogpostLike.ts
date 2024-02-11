import { Schema, model, models } from 'mongoose';

const blogpostLikeSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'Like must belong to a user'],
    },
    blogpostId: {
      type: Schema.ObjectId,
      ref: 'Blog',
      required: [true, 'Like must belong to a blogpost'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogpostLikeSchema.index({ userId: 1, blogpostId: 1 });

const BlogpostLike =
  models.BlogpostLike || model('BlogpostLike', blogpostLikeSchema);
export default BlogpostLike;
