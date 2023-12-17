'use server';

import { authConfig } from '@/configs/auth';
import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteMyProfilePicture = async () => {
  const session = await getServerSession(authConfig);

  try {
    await connectToDB();
    const me = await User.findById(session?.user.id);

    if (!me) {
      return {
        errMessage: 'No user found!',
      };
    }

    // Если у нас нет картинки в профиле - выдаем ошибку о том, что нечего удалять
    if (!me?.image?.publicId || !me?.image?.imageUrl) {
      return {
        errMessage: "You don't have profile picture to delete",
      };
    }

    // Удаляем картинку из cloudinary
    const destroyResponse = await cloudinary.uploader.destroy(
      me.image.publicId,
      { resource_type: 'image' }
    );

    // Если пришла ошибка после удаления из cloudinary
    if (destroyResponse && destroyResponse?.result === 'not found') {
      return {
        errMessage: 'Your profile picture does not exist',
      };
    }

    // удаляем запись в бд о картинке у себя
    me.image = undefined;

    // Сохраняем обновления
    await me.save({
      validateBeforeSave: false,
    });
  } catch (error) {
    console.log(error);

    return {
      errMessage: 'Something went wrong! Try again later!',
    };
  }

  revalidateTag('myself');
  revalidateTag('getUsers');
};
