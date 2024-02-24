'use server';

import { authConfig } from '@/configs/auth';
import { MAX_IMAGE_FILE_SIZE_IN_KB } from '@/configs/requestConfig';
import Blog from '@/models/Blog';
import { BlogpostTags } from '@/types/blogTypes';
import { getBase64Size } from '@/utils/getBase64StringSize';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { revalidateTag } from 'next/cache';
import { RequestTags } from '@/types/requestTypes';
import {
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { getCorrectDateTime } from '@/utils/getCorrectTimeDate';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOptions: UploadApiOptions = {
  overwrite: true,
  invalidate: true,
  resource_type: 'image',
};

const EditBlogpostSchema = z.object({
  image: z
    .union([z.string(), z.undefined()])
    .refine(
      (base64Image) =>
        !base64Image || (base64Image && base64Image.startsWith('data:image')),
      'Only images are allowed!'
    )
    .refine(
      (base64Image) =>
        !base64Image ||
        (base64Image &&
          getBase64Size(base64Image, true) <= MAX_IMAGE_FILE_SIZE_IN_KB),
      `Max image size is 2MB.`
    ),
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

    let cloudinaryResponse: UploadApiResponse | undefined;

    // 2. Попробуем сразу найти блогпост по моему id (owner) и blogpostId и обновить его
    // 2. Сначала находим свой блогпост
    const blogpost = await Blog.findOne({
      owner: session?.user.id,
      _id: blogpostId,
    });

    // 2.1. Если не нашло такого (выскочила ошибка) - возвращаем ошибку
    if (!blogpost) {
      return {
        errMsg: 'This blogpost does no longer exist',
      };
    }

    //* Если у нас есть картинка (мы передали ее в параметры функции aka мы захотели ее обновить и она не undefined) - только тогда будем выполнять код по загрузке картинки в cloudinary
    if (validatedFields.data?.image) {
      if (blogpost.image?.publicId) {
        uploadOptions.public_id = blogpost.image.publicId;
      }

      // 3. Загружаем картинку на cloudinary
      cloudinaryResponse = await cloudinary.uploader.upload(
        image as string,
        uploadOptions
      );
    }

    // 4. Обновляем свой блогпост
    blogpost.text = validatedFields.data.text;
    blogpost.title = validatedFields.data.title;
    blogpost.tag = validatedFields.data.tag;
    // Обновим картинку только если мы ее действительно хотим обновить
    if (cloudinaryResponse) {
      blogpost.image = {
        imageUrl: cloudinaryResponse.secure_url,
        publicId: cloudinaryResponse.public_id,
      };
    }
    blogpost.lastUpdatedAt = getCorrectDateTime();

    // 5. Сохраняем обновления
    await blogpost.save();
  } catch (error) {
    console.error(error);

    return {
      errMsg: 'Failed to update blogpost! Try again later!',
    };
  }

  revalidateTag(RequestTags.GET_BLOGPOSTS);
};
