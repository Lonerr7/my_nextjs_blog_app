import { connectToDB } from '@/utils/connectToDB';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import User from '@/models/User';

export const POST = async (req: NextRequest) => {
  const { token }: { token: string | null } = await req.json();

  console.log(token);

  if (!token) {
    return new NextResponse('Error, try again later', { status: 400 });
  }

  await connectToDB();
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpires: { $gt: Date.now() },
  }).select('_id');

  if (!user) {
    return new NextResponse('Invalid token or token has expired', {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify(user), { status: 200 });
};
