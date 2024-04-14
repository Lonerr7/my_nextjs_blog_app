import Blog from '@/models/Blog';
import { connectToDB } from '@/utils/connectToDB';
import { generateMongooseSearchOptions } from '@/utils/generateMongooseSearchOptions';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const searchOptions = generateMongooseSearchOptions(req);
  try {
    const owner = req.nextUrl.searchParams.get('owner');

    let totalBlogpostsDocs = 0;

    await connectToDB();
    if (owner !== 'undefined') {
      totalBlogpostsDocs = await Blog.countDocuments({
        owner,
        ...searchOptions,
      });
    } else {
      totalBlogpostsDocs = await Blog.countDocuments(searchOptions);
    }

    return new Response(JSON.stringify(totalBlogpostsDocs), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify(error), { status: 500 });
  }
};
