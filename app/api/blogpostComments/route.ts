import Comment from '@/models/Comment';
import { connectToDB } from '@/utils/connectToDB';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    // 1. Getting params from query URL
    const blogpostId = req.nextUrl.searchParams.get('blogpostId');
    const page = req.nextUrl.searchParams.get('page');
    const searchQuery = req.nextUrl.searchParams.get('searchQuery');

    await connectToDB();
    const comments = await Comment.find({ blogpostId })
      .skip((Number(page) - 1) * 8)
      .sort({ $natural: 1 })
      .limit(8)
      .populate({
        path: 'owner',
        match: { username: { $regex: searchQuery, $options: 'i' } },
        select: 'username image',
        // options: {
        //   skip: (Number(page) - 1) * 8,
        //   limit: 8,
        //   sort: { $natural: 1 },
        // },
      });

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ errMsg: 'Something went worng! Try again later!' }),
      { status: 500 }
    );
  }
};
