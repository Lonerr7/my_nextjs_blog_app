'use server';

import { authConfig } from '@/configs/auth';
import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { handleServerActionError } from '@/utils/handleServerActionError';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

// TODO на утро 21.11: Обновлять только те поля, которые были изменены ()

export const updateMyInfo = async (formData: FormData) => {
  const {
    username,
    job,
    image,
    facebook,
    instagram,
    status,
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
