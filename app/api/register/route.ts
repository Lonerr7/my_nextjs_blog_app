import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    await connectToDB();
    const existingUser = await User.findOne({ username: data.username });

    if (!existingUser) {
      const newUser = await User.create({ ...data });
      return new Response(JSON.stringify(newUser), { status: 201 });
    }

    // if user exist return error message as a response
    return new Response(
      JSON.stringify({ message: 'The user already exist!' }),
      { status: 409 }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ ...error }), { status: 400 });
  }
};
