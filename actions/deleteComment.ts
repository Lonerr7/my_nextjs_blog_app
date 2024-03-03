'use server';

import { authConfig } from '@/configs/auth';
import Blog from '@/models/Blog';
import Comment from '@/models/Comment';
import { RequestTags } from '@/types/requestTypes';
import { connectToDB } from '@/utils/connectToDB';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';

export const deleteComment = async ({
  commentId,
  blogpostId,
}: {
  commentId: string;
  blogpostId: string;
}) => {
  try {
    const session = await getServerSession(authConfig);

    await connectToDB();
    const deletedComment = await Comment.findOneAndDelete(
      {
        _id: commentId,
        owner: session?.user.id,
      },
      {
        new: true,
      }
    );

    if (!deletedComment) {
      return {
        errMessage: "The comment you are trying to delete doesn't exist!",
      };
    }

    const blogpost = await Blog.findById(blogpostId);
    blogpost.commentsCount -= 1;
    await blogpost.save();
  } catch (error) {
    console.error(error);
    return {
      errMessage: 'Something went wrong! Try again later!',
    };
  }

  revalidateTag(RequestTags.GET_BLOGPOST_COMMENTS);

  return {
    errMessage: null,
  };
};
