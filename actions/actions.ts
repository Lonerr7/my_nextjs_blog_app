'use server';

import { authConfig } from '@/configs/auth';
import { connectToDB } from '@/utils/connectToDB';
import { getServerSession } from 'next-auth';

export const updateMyUsername = async (formData: FormData) => {
  const mockName = 'vanya';
  const session = await getServerSession(authConfig);
  console.log(`session from server action`, session);

  // Если мой id взятый из сессии совпадает с id пользователя, что я хочу изменить (то есть себя), то все ок, нет - выдаем ошибку
  // Почитать про серверные экшены и их бонусы в защите

  try {
    await connectToDB();
  } catch (error) {}
};
