'use server';

import { authConfig } from '@/configs/auth';
import Blog from '@/models/Blog';
import Comment from '@/models/Comment';
import { RequestTags } from '@/types/requestTypes';
import { connectToDB } from '@/utils/connectToDB';
import { getCorrectDateTime } from '@/utils/getCorrectTimeDate';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const EditMyInfoSchema = z.object({
  text: z
    .string()
    .min(3, 'Comment must be 3 characters or more')
    .max(500, 'Comment must not be more than 500 characters'),
});

export const createBlogpostComment = async ({
  blogpostId,
  text,
}: {
  blogpostId: string;
  text: string;
}) => {
  const session = await getServerSession(authConfig);

  // Validating input fields before sendning a request
  const validatedFields = EditMyInfoSchema.safeParse({ text });

  if (!validatedFields.success) {
    return {
      errMessage: validatedFields.error.issues[0].message,
    };
  }

  try {
    await connectToDB();
    const blogpost = await Blog.findById(blogpostId);

    if (!blogpost) {
      return {
        errMessage:
          'Blogpost you are trying to comment on does no longer exist!',
      };
    }

    await Comment.create({
      text,
      owner: session?.user.id,
      to: blogpostId,
      createdAt: getCorrectDateTime(),
    });

    blogpost.commentsCount += 1;
    await blogpost.save();
  } catch (error: any) {
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
