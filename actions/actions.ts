'use server';

import { authConfig } from '@/configs/auth';
import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';

// TODO на утро 21.11: Обновлять только те поля, которые были изменены ()

export const updateMyUsername = async (formData: FormData) => {
  const { username } = {
    username: formData.get('username'),
  };
  const session = await getServerSession(authConfig);

  // Если мой id взятый из сессии совпадает с id пользователя, что я хочу изменить (то есть себя), то все ок, нет - выдаем ошибку
  // Почитать про серверные экшены и их бонусы в защите

  try {
    await connectToDB();
    await User.findByIdAndUpdate(
      session?.user.id,
      { username },
      { runValidators: true }
    );

    revalidateTag('myself');
    revalidateTag('getUsers');
  } catch (error) {
    console.error(error);

    return {
      message: 'Error when updating a user!',
    };
  }
};
