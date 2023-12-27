import Blog from '@/models/Blog';
import { CreateBlogApiRouteInput } from '@/types/blogTypes';
import { connectToDB } from '@/utils/connectToDB';
import { getCorrectDateTime } from '@/utils/getCorrectTimeDate';
import { NextRequest } from 'next/server';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOptions: UploadApiOptions = {
  overwrite: false,
  invalidate: true,
  resource_type: 'image',
};

export const POST = async (req: NextRequest) => {
  try {
    const owner = req.nextUrl.searchParams.get('userId');
    console.log(owner);

    if (!owner) {
      return new Response(
        JSON.stringify({ errMsg: 'A post should belong to a user' }),
        { status: 400 }
      );
    }

    const { image, tag, text }: CreateBlogApiRouteInput = await req.json();

    // Загружаем картинку на cloudinary
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      image,
      uploadOptions
    );
    await connectToDB();

    console.log(secure_url, public_id);

    // Creating a blogpost
    const newBlogPost = await Blog.create({
      tag,
      text,
      image: {
        imageUrl: secure_url,
        publicId: public_id,
      },
      owner,
      createdAt: getCorrectDateTime(),
    });

    return new Response(JSON.stringify(newBlogPost), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({ errMsg: 'Something went worng! Try again later!' }),
      { status: 500 }
    );
  }
};
