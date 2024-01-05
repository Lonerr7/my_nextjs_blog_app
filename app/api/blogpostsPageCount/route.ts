import Blog from '@/models/Blog';
import { connectToDB } from '@/utils/connectToDB';
import { generateMongooseSearchOptions } from '@/utils/generateMongooseSearchOptions';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const searchOptions = generateMongooseSearchOptions(req);

    await connectToDB();
    const totalUsersPages = await Blog.countDocuments(searchOptions);

    return new Response(JSON.stringify(totalUsersPages), { status: 200 });
  } catch (error) {}
};
