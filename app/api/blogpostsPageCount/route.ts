import Blog from '@/models/Blog';
import { connectToDB } from '@/utils/connectToDB';
import { generateMongooseSearchOptions } from '@/utils/generateMongooseSearchOptions';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const searchOptions = generateMongooseSearchOptions(req);
    const owner = req.nextUrl.searchParams.get('owner');
    console.log(`searchOptions`, searchOptions);

    let totalBlogpostsPages = 0;

    await connectToDB();
    if (owner) {
      totalBlogpostsPages = await Blog.countDocuments({owner, ...searchOptions});
    } else {
      totalBlogpostsPages = await Blog.countDocuments(searchOptions);
    }

    return new Response(JSON.stringify(totalBlogpostsPages), { status: 200 });
  } catch (error) {}
};
