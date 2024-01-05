import Blog from '@/models/Blog';
import { CreateBlogApiRouteInput, IBlogPost } from '@/types/blogTypes';
import { connectToDB } from '@/utils/connectToDB';
import { getCorrectDateTime } from '@/utils/getCorrectTimeDate';
import { NextRequest } from 'next/server';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { revalidateTag } from 'next/cache';

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

    if (!owner) {
      return new Response(
        JSON.stringify({ errMsg: 'A post should belong to a user' }),
        { status: 400 }
      );
    }

    const { image, tag, text, title }: CreateBlogApiRouteInput =
      await req.json();

    // Загружаем картинку на cloudinary
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      image,
      uploadOptions
    );
    await connectToDB();

    // Creating a blogpost
    const newBlogPost = await Blog.create({
      tag,
      text,
      title,
      image: {
        imageUrl: secure_url,
        publicId: public_id,
      },
      owner,
      createdAt: getCorrectDateTime(),
    });

    revalidateTag('myself');

    return new Response(JSON.stringify(newBlogPost), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ errMsg: 'Something went worng! Try again later!' }),
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    // 1. Getting params from query URL
    const owner =
      req.nextUrl.searchParams.get('ownerId') == 'null' ||
      req.nextUrl.searchParams.get('ownerId') == 'undefined'
        ? null
        : req.nextUrl.searchParams.get('ownerId');

    const page = req.nextUrl.searchParams.get('page');
    const query = req.nextUrl.searchParams.get('blogpostsSearchQuery');
    const tagFilter = req.nextUrl.searchParams.get('blogpostsTagFilter');

    // 2. Getting the result from DB based on passed parametres
    let blogposts: IBlogPost[];
    await connectToDB();

    if (owner) {
      blogposts = await Blog.find({ owner }, '-text');
    } else {
      blogposts = await Blog.find()
        .select('-text')
        .populate('owner', 'username image');
    }

    return new Response(JSON.stringify(blogposts));
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ errMsg: 'Something went worng! Try again later!' }),
      { status: 500 }
    );
  }
};
