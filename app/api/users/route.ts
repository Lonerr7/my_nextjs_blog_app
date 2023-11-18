import User from '@/models/User';
import { IUser } from '@/types/userTypes';
import { connectToDB } from '@/utils/connectToDB';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');
    let searchOptions;

    if (query) {
      searchOptions = { username: { $regex: query, $options: 'i' } };
    } else {
      searchOptions = {};
    }

    await connectToDB();
    const allUsers: IUser[] = await User.find(searchOptions);

    return new Response(JSON.stringify(allUsers), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ ...error }), { status: 400 });
  }
};
