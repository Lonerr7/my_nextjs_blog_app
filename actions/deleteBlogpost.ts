'use server';

import Blog from '@/models/Blog';
import { connectToDB } from '@/utils/connectToDB';

export const deleteBlogpost = async (
  blogpostId: string,
  fromData: FormData
) => {
  try {
    await connectToDB();
    const removedBlogpost = await Blog.findByIdAndDelete(blogpostId);

    if (!removedBlogpost) {
      return {
        errMsg: 'No blogpost found',
      };
    }
  } catch (error) {
    console.error(error);

    return {
      errMsg: 'Something went wrong, try again later!',
    };
  }
};
