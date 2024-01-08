'use server';

import Blog from '@/models/Blog';
import { RequestTags } from '@/types/requestTypes';
import { connectToDB } from '@/utils/connectToDB';
import { revalidateTag } from 'next/cache';

export const deleteBlogpost = async (blogpostId: string) => {
  try {
    await connectToDB();
    const removedBlogpost = await Blog.findByIdAndDelete(blogpostId);

    if (!removedBlogpost) {
      return {
        errMsg: 'No blogpost found',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      errMsg: 'Something went wrong, try again later!',
    };
  } finally {
    revalidateTag(RequestTags.GET_BLOGPOSTS);
  }
};
