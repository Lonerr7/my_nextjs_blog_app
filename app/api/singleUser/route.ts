import { authConfig } from '@/configs/auth';
import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authConfig);
    console.log(session);

    const id = req.nextUrl.searchParams.get('id')!;
    await connectToDB();
    const user = await User.findById(id);

    if (!user) {
      throw new Error('Failed to get the user');
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 404 });
  }
};
