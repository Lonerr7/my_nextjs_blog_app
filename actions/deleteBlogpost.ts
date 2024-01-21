'use server';

import { authConfig } from '@/configs/auth';
import Blog from '@/models/Blog';
import { RequestTags } from '@/types/requestTypes';
import { connectToDB } from '@/utils/connectToDB';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';

export const deleteBlogpost = async (blogpostId: string) => {
  try {
    const session = await getServerSession(authConfig);

    await connectToDB();
    const blogpostToDelete = await Blog.findById(blogpostId);

    if (session?.user.id !== blogpostToDelete.owner.toString()) {
      return {
        errMsg: 'You cannot perform this action',
      };
    }

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
