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

    // 1. Получаем блогпост, который хотим лайкнуть/дизлайкнуть
    const blogpost = await Blog.findById(blogpostId);

    // 2. Проверяем есть ли в массиве лайков мой id
    if (blogpost?.likes?.includes(myId)) {
      // 2.1. Если да - дизалйкаем
      blogpost.likes = blogpost.likes.filter((like: string) => String(like) !== myId);
    } else {
      // 2.2. Если нет - лайкаем
      blogpost.likes.push(myId);
    }

    await blogpost.save();

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
