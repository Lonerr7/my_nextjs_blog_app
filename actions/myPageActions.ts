'use server';

import { authConfig } from '@/configs/auth';
import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { handleServerActionError } from '@/utils/handleServerActionError';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { cookies } from 'next/headers';

const EditMyInfoSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be 3 characters or more from')
    .max(20, 'Username must not be more than 20 characters'),
  job: z.string().max(40, 'Job must not be more than 40 characters').optional(),
  status: z
    .string()
    .max(100, 'Status must not be more than 100 characters')
    .optional(),
  facebook: z
    .string()
    .max(100, 'Facebook must not be more than 100 characters')
    .optional(),
  instagram: z
    .string()
    .max(100, 'Instagram must not be more than 100 characters')
    .optional(),
  twitter: z
    .string()
    .max(100, 'Twitter must not be more than 100 characters')
    .optional(),
  youtube: z
    .string()
    .max(100, 'Youtube must not be more than 100 characters')
    .optional(),
});

export const updateMyInfo = async (formData: FormData) => {
  const {
    username,
    job,
    image,
    status,
    facebook,
    instagram,
    twitter,
    youtube,
  } = {
    username: formData.get('username'),
    image: formData.get('image'),
    job: formData.get('job'),
    facebook: formData.get('facebook'),
    instagram: formData.get('instagram'),
    twitter: formData.get('twitter'),
    youtube: formData.get('youtube'),
    status: formData.get('status'),
  };
  const session = await getServerSession(authConfig);
  const token = cookies().get('next-auth.session-token');

  console.log(`token from cookie in server aciton:_`, token);

  // Если мой id взятый из сессии совпадает с id пользователя, что я хочу изменить (то есть себя), то все ок, нет - выдаем ошибку
  // Почитать про серверные экшены и их бонусы в защите

  const query = {
    username,
    job: job || '',
    image: image || '',
    status: status || '',
    socials: {
      facebook: facebook || '',
      instagram: instagram || '',
      twitter: twitter || '',
      youtube: youtube || '',
    },
  };

  // Validating input fields before sendning a request
  const validatedFields = EditMyInfoSchema.safeParse(query);

  if (!validatedFields.success) {
    console.log(validatedFields.error);

    console.log(`from zod`);

    return {
      message: validatedFields.error.issues[0].message,
    };
  }

  try {
    await connectToDB();
    await User.findByIdAndUpdate(session?.user.id, query, {
      runValidators: true,
    });
  } catch (error: any) {
    return handleServerActionError(error);
  }

  revalidateTag('myself');
  revalidateTag('getUsers');
  redirect('/my-page');
};
