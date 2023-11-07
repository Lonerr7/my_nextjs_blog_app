import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';

export const POST = async (req: Request) => {
  const data = await req.json();

  await connectToDB();

  const existingUser = await User.findOne({ username: data.username });

  console.log(`existing user`, existingUser);

  if (!existingUser) {
    const newUser = await User.create({ ...data });
    return new Response(JSON.stringify(newUser), { status: 201 });
  }

  return null;
};
