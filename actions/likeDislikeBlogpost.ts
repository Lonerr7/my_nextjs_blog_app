'use server';

import Blog from '@/models/Blog';
import { RequestTags } from '@/types/requestTypes';
import { connectToDB } from '@/utils/connectToDB';
import { revalidateTag } from 'next/cache';

export const likeDislikeBlogpost = async ({
  blogpostId,
  userId,
}: {
  blogpostId: string;
  userId: string;
}) => {
  try {
    await connectToDB();
    const blogpost = await Blog.findById(blogpostId);
    const isLiked = blogpost?.likes?.get(userId);

    if (isLiked) {
      blogpost?.likes?.delete(userId);
    } else {
      if (!blogpost?.likes) {
        blogpost.likes = {
          [userId]: true,
        };
      } else {
        blogpost.likes.set(userId, true);
      }
    }

    await Blog.findByIdAndUpdate(blogpostId, {
      likes: blogpost.likes,
    });

    revalidateTag(RequestTags.GET_BLOGPOSTS);
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      errMsg: 'Something went wrong, try again later!',
    };
  }
};
