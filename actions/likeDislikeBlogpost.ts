'use server';

import { authConfig } from '@/configs/auth';
import Blog from '@/models/Blog';
import BlogpostLike from '@/models/BlogpostLike';
import { RequestTags } from '@/types/requestTypes';
import { connectToDB } from '@/utils/connectToDB';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';

export const likeDislikeBlogpost = async (blogpostId: string) => {
  try {
    await connectToDB();
    const session = await getServerSession(authConfig);
    const myId = session?.user.id;

    const [blogpost, likeToBeModified] = await Promise.all([
      Blog.findById(blogpostId),
      BlogpostLike.findOneAndDelete({
        userId: myId,
        blogpostId,
      }),
    ]);

    if (blogpost.isLikedByMe && likeToBeModified) {
      // значит лайк на этот блогпост уже был в системе и мы хотим дизлайкнуть
      blogpost.isLikedByMe = false;
      blogpost.likesCount -= 1;
    } else {
      await BlogpostLike.create({ userId: myId, blogpostId });
      blogpost.isLikedByMe = true;
      blogpost.likesCount += 1;
    }

    await blogpost.save();

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
