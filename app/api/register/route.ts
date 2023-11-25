import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    console.log(data);
    
    await connectToDB();
    const [userByEmail, userByUsername] = await Promise.all([
      User.exists({ email: data.email }),
      User.exists({ username: data.username }),
    ]);

    if (!userByEmail && !userByUsername) {
      const newUser = await User.create({ ...data });
      console.log(newUser);

      return new Response(JSON.stringify(newUser), { status: 201 });
    }

    // if user exist return error message as a response
    return new Response(
      JSON.stringify({ message: 'The user already exist!' }),
      { status: 409 }
    );
  } catch (error: any) {
    // console.log(error.errors.username.properties.message);

    return new Response(JSON.stringify({ ...error }), { status: 400 });
  }
};
