'use server';

import { authConfig } from '@/configs/auth';
import Comment from '@/models/Comment';
import { RequestTags } from '@/types/requestTypes';
import { connectToDB } from '@/utils/connectToDB';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';

export const likeDislikeComment = async (commentId: string) => {
  try {
    await connectToDB();
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return {
        errMessage: 'Comment does not exist!',
      };
    }

    const session = await getServerSession(authConfig);
    const myId = session?.user.id;

    if (!myId) {
      return {
        errMessage: 'You must be logged in to perform this action!',
      };
    }

    const isLiked = comment?.likes?.get(myId);

    if (isLiked) {
      comment?.likes?.delete(myId);
    } else {
      if (!comment?.likes) {
        comment.likes = {
          [myId]: true,
        };
      } else {
        comment.likes.set(myId, true);
      }
    }

    await comment.save();

    return {
      errMessage: null,
    };
  } catch (error) {
    console.error(error);

    return {
      errMessage: 'Something went wrong, try again later!',
    };
  } finally {
    revalidateTag(RequestTags.GET_BLOGPOST_COMMENTS);
  }
};
