'use server';

import { authConfig } from '@/configs/auth';
import { MAX_IMAGE_FILE_SIZE_IN_KB } from '@/configs/requestConfig';
import Blog from '@/models/Blog';
import { BlogpostTags } from '@/types/blogTypes';
import { getBase64Size } from '@/utils/getBase64StringSize';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { RedirectType, redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { RequestTags } from '@/types/requestTypes';

const EditBlogpostSchema = z.object({
  // image: z
  //   .string()
  //   .optional()
  //   .refine(
  //     (base64Image) => base64Image && base64Image.startsWith('data:image'),
  //     'Only images are allowed!'
  //   )
  //   .refine(
  //     (base64Image) =>
  //       base64Image &&
  //       getBase64Size(base64Image, true) <= MAX_IMAGE_FILE_SIZE_IN_KB,
  //     `Max image size is 2MB.`
  //   ),
  tag: z.nativeEnum(BlogpostTags, {
    errorMap: () => ({
      message: 'Please, select a blogpost tag',
    }),
  }),
  text: z
    .string({ required_error: 'Blogpost text is required!' })
    .min(1, 'Please, enter text for your blogpost!')
    .max(1000, 'Blogpost cannot be more than 1000 characters')
    .refine(
      (textValue) => textValue.replace(/<(.|\n)*?>/g, '').trim().length !== 0,
      'Blogpost cannot be empty!'
    ),
  blogpostId: z.string(),
  title: z
    .string()
    .min(3, 'Title should be at least 3 characters')
    .max(125, "Title shouldn't be more than 125 characters"),
});

export const updateMyBlogpost = async (
  blogpostId: string,
  {
    text,
    image,
    title,
    tag,
  }: { text: string; image?: string; title: string; tag: BlogpostTags }
) => {
  console.log(`image: ${image}`);

  // 0. Валидируем инпут
  const validatedFields = EditBlogpostSchema.safeParse({
    text,
    image,
    title,
    tag,
    blogpostId,
  });

  if (!validatedFields.success) {
    return {
      errMsg: validatedFields.error.issues[0].message,
    };
  }

  try {
    // 1. Получаем мой id из серверной сессии
    const session = await getServerSession(authConfig);

    // 2. Попробуем сразу найти блогпост по моему id (owner) и blogpostId и обновить его
    const newBlogpost = await Blog.findOneAndUpdate(
      {
        owner: session?.user.id,
        _id: blogpostId,
      },
      {
        text: validatedFields.data.text,
        title: validatedFields.data.title,
        tag: validatedFields.data.tag,
        // [image ? 'image' : 'null']: image ? validatedFields.data.image : null,
      }
    );

    // 3. Если не нашло такого (выскочила ошибка) - возвращаем ошибку
    if (!newBlogpost) {
      return {
        errMsg: 'Failed to update blogpost!',
      };
    }
  } catch (error) {}

  revalidateTag(RequestTags.GET_BLOGPOSTS);
  redirect('/my-page');
};
