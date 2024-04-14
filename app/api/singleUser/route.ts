import User from '@/models/User';
import Blog from '@/models/Blog';
import { connectToDB } from '@/utils/connectToDB';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id')!;
  const populateBlogs = req.nextUrl.searchParams.get('populateBlogs');
  
  try {
    let user: any = undefined;
    await connectToDB();

    if (populateBlogs === 'true') {
      Blog; // не хочет делать virtual populate без "регистрации" модели Blog
      user = await User.findById(id).populate('blogs', '-text');
    } else {
      user = await User.findById(id);
    }

    if (!user) {
      throw new Error('Failed to get the user');
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ error }), { status: 404 });
  }
};
