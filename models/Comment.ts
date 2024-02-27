import { Schema, model, models } from 'mongoose';

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Please enter comment's text"],
      minLength: [3, "Comment shouldn't be less than 3 characters"],
      maxLength: [500, "Comment shouldn't be more than 500 characters"],
    },
    to: {
      type: Schema.ObjectId,
      ref: 'Blog',
      required: [true, 'Comment must belong to a blogpost'],
    },
    owner: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
    createdAt: {
      type: Date,
      required: [true, 'Comment should have a date of creation'],
    },
    lastUpdatedAt: Date,
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.index({ to: 1, owner: 1 });

const Comment = models.Comment || model('Comment', commentSchema);
export default Comment;
