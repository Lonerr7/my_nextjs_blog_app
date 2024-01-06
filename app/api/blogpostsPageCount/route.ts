import Blog from '@/models/Blog';
import { connectToDB } from '@/utils/connectToDB';
import { generateMongooseSearchOptions } from '@/utils/generateMongooseSearchOptions';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const searchOptions = generateMongooseSearchOptions(req);
    console.log(`searchOptions`, searchOptions);

    await connectToDB();
    const totalBlogpostsPages = await Blog.countDocuments(searchOptions);

    return new Response(JSON.stringify(totalBlogpostsPages), { status: 200 });
  } catch (error) {}
};
