'use server';

import { authConfig } from '@/configs/auth';
import User from '@/models/User';
import { correctPassword } from '@/utils/correctPassword';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, 'Password should be at least 6 characters')
      .max(25, "Password shouldn't be more than 25 characters"),
    newPassword: z
      .string()
      .min(6, 'Password should be at least 6 characters')
      .max(25, "Password shouldn't be more than 25 characters"),
    newPasswordConfirm: z
      .string()
      .min(6, 'Password should be at least 6 characters')
      .max(25, "Password shouldn't be more than 25 characters"),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: 'Passwords are not the same',
    path: ['newPasswordConfirm'],
  });

export const changePassword = async (unvalidatedInputValues: {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}) => {
  // Validating input fields before sendning a request to DB
  const validatedFields = changePasswordSchema.safeParse(
    unvalidatedInputValues
  );

  if (!validatedFields.success) {
    return {
      errMessage: validatedFields.error.issues[0].message,
    };
  }

  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return {
        errMessage: 'You must be logged in to do that!',
      };
    }

    const user = await User.findById(session.user.id).select('+password');

    if (!user) {
      return {
        errMessage: 'You do not exist!',
      };
    }

    // Check if POSTed password is correct
    if (
      !(await correctPassword({
        candidatePassword: validatedFields.data.oldPassword,
        userPassword: user.password,
      }))
    ) {
      return {
        errMessage: 'Wrong password! Try again!',
      };
    }

    // If password is correct => update it
    user.password = validatedFields.data.newPassword;
    user.passwordConfirm = validatedFields.data.newPasswordConfirm;
    await user.save();

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
