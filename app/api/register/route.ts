import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { username, email, password, passwordConfirm } = await req.json();
    console.log(req.cookies.get('next-auth.csrf-token'));

    await connectToDB();
    const [userByEmail, userByUsername] = await Promise.all([
      User.exists({ email }),
      User.exists({ username }),
    ]);

    if (!userByEmail && !userByUsername) {
      const newUser = await User.create({
        email,
        username,
        password,
        passwordConfirm,
      });

      // resetting the password so we don't return it (we take password from the input to log the user in)
      newUser.password = undefined;

      return new Response(JSON.stringify(newUser), { status: 201 });
    }

    // if user exist return error message as a response
    return new Response(
      JSON.stringify({ message: 'The user already exist!' }),
      { status: 409 }
    );
  } catch (error: any) {
    console.log(error.errors);

    return new Response(JSON.stringify({ ...error }), { status: 400 });
  }
};
