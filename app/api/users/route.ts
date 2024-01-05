import { USERS_ITEMS_PER_PAGE } from '@/configs/requestConfig';
import User from '@/models/User';
import { IUser } from '@/types/userTypes';
import { connectToDB } from '@/utils/connectToDB';
import { generateMongooseSearchOptions } from '@/utils/generateMongooseSearchOptions';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const searchOptions = generateMongooseSearchOptions(req);
    const page = req.nextUrl.searchParams.get('page');

    await connectToDB();
    const allUsers: IUser[] = await User.find(searchOptions)
      .limit(USERS_ITEMS_PER_PAGE)
      .skip((Number(page) - 1) * USERS_ITEMS_PER_PAGE);

    return new Response(JSON.stringify(allUsers), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ ...error }), { status: 400 });
  }
};
