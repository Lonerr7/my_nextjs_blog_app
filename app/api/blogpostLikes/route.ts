import Blog from '@/models/Blog';
import { connectToDB } from '@/utils/connectToDB';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    // 1. Getting params from query URL
    const blogpostId = req.nextUrl.searchParams.get('blogpostId');
    const page = req.nextUrl.searchParams.get('page');

    console.log(page);

    await connectToDB();
    const blogpost = await Blog.findById(blogpostId)
      .select('_id likes')
      .populate([
        {
          path: 'likes',
          select: 'image username status',
          options: {
            skip: (Number(page) - 1) * 5,
            limit: 5,
            sort: {},
          },
        },
      ]);

    return new Response(JSON.stringify(blogpost.likes), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ errMsg: 'Something went worng! Try again later!' }),
      { status: 500 }
    );
  }
};
