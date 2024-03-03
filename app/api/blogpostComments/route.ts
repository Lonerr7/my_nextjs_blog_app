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
    const comments = await Comment.find({
      to: blogpostId,
    })
      .skip((Number(page) - 1) * 10)
      .limit(10)
      .sort({ createdAt: -1 })
      .populate({
        path: 'owner',
        match: { username: { $regex: searchQuery, $options: 'i' } },
        select: 'username image',
      });

    console.log(comments.length);

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ errMsg: 'Something went worng! Try again later!' }),
      { status: 500 }
    );
  }
};
