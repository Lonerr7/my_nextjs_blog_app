'use server';

import { authConfig } from '@/configs/auth';
import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';

// TODO 1) Из-за того, что мы преобразуем картинку в base64 формат на клиенте, у нас отпадает возможность провалидировать ее на формат и исключить возможность добавления файлов с некартиночным расширением. Это нужно как-то обработать, так как зод не сможет валидировать строку на формат. 2)

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

const MAX_FILE_SIZE = 5242500;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const updateMyProfilePic = async (formData: FormData) => {
  const inputImage = formData.get('image');
  const session = await getServerSession(authConfig);

  try {
    await connectToDB();
    const me: any = await User.findById(session?.user.id);

    if (!me) {
      return {
        errMessage: 'No user found!',
      };
    }

    // Если у нас уже есть картинка, то заменяем ее в cloudinary, а не создаем новую. Для этого нужен public_id старой картинки из БД
    if (me.image?.publicId) {
      uploadOptions.public_id = me.image.publicId;
    }
    
    // Загружаем картинку на cloudinary
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      inputImage as string,
      uploadOptions
    );
    
    // Обновляем себя в БД
    me.image = {
      imageUrl: secure_url,
      publicId: public_id,
    };

    // Сохраняем обновления
    await me.save({
      validateBeforeSave: false,
    });
  } catch (error: any) {
    console.log(error);
    if (error.kind === 'ObjectId') {
      return {
        errMessage: 'No user found!',
      };
    }
  }
};
