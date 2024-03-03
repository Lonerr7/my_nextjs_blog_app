import { connectToDB } from '@/utils/connectToDB';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import User from '@/models/User';

export const POST = async (req: NextRequest) => {
  try {
    const { token }: { token: string | null } = await req.json();

    if (!token) {
      return new NextResponse('Error, try again later', { status: 400 });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const date = new Date();
    date.setHours(date.getHours() + 3);
    const ISODate = date.toISOString();

    await connectToDB();
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpires: { $gt: ISODate },
    }).select('_id');

    if (!user) {
      return new NextResponse('Invalid token or token has expired', {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Something went wrong! Try again later...', {
      status: 500,
    });
  }
};
