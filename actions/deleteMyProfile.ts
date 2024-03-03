'use server';

import { authConfig } from '@/configs/auth';
import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { getServerSession } from 'next-auth';

export const deleteMyProfile = async () => {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return {
        errMessage: 'You must be logged in to delete your profile!',
      };
    }

    await connectToDB();
    const myself = await User.findByIdAndDelete(session.user.id);

    if (!myself) {
      return {
        errMessage: 'The user does not exist',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      errMessage: 'Something went wrong! Try again later!',
    };
  }
};
