import { Schema, model, models } from 'mongoose';

const blogSchema = new Schema({
  tag: {
    type: String,
    required: [true, "Please enter blog's tag"],
  },
  image: {
    imageUrl: {
      type: String,
    },
    publicId: {
      type: String,
    },
  }, // здесь надо продумать сколько будет у блога картинок: будет ли картинка-превью и основная картинка. Как они будут храниться в БД
  text: {
    type: String,
    required: [true, "Please enter blog's text"],
    maxLength: [1000, "Blog shouldn't be more than 1000 characters"], // может быть сделать больше в будущем
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'Blog must belong to a user'],
  }, //! Правильно ли я все тут указал?? Не нужно ли назвать это поле 'user' а не 'owner'?
  createdAt: Date,
});

const Blog = models.Blog || model('Blog', blogSchema);
export default Blog;