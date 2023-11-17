import User from '@/models/User';
import { IUser } from '@/types/userTypes';
import { connectToDB } from '@/utils/connectToDB';

export const GET = async () => {
  console.log(`from get request`);

  try {
    await connectToDB();
    const allUsers: IUser[] = await User.find();

    console.log(`allUsers`, allUsers);

    return new Response(JSON.stringify(allUsers), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ ...error }), { status: 400 });
  }
};
