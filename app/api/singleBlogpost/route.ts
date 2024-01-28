import Blog from '@/models/Blog';
import { connectToDB } from '@/utils/connectToDB';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const blogpostId = req.nextUrl.searchParams.get('blogpostId');

    await connectToDB();

    // Здесь будет if else в котором если мы передали параметр, чтобы сделать populate лайков, то выполнится одна ветка if else, если нет, то другая ветка

    const blogpost = await Blog.findById(blogpostId)
      .populate('owner', 'username image')
      

    if (!blogpost) {
      throw new Error('Failed to fetch blogpost');
    }

    return new Response(JSON.stringify(blogpost), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 404 });
  }
};
