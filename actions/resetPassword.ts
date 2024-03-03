'use server';

import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { z } from 'zod';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password should be at least 6 characters')
      .max(25, "Password shouldn't be more than 25 characters"),
    passwordConfirm: z
      .string()
      .min(6, 'Password should be at least 6 characters')
      .max(25, "Password shouldn't be more than 25 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords are not the same!',
    path: ['passwordConfirm'],
  });

export const resetPassword = async (userId: string, formData: FormData) => {
  const unvalidatedInputValues = {
    password: formData.get('password'),
    passwordConfirm: formData.get('passwordConfirm'),
  };

  // Validating input fields before sendning a request to DB
  const validatedFields = resetPasswordSchema.safeParse(unvalidatedInputValues);

  if (!validatedFields.success) {
    return {
      success: false,
      errMessage: validatedFields.error.issues[0].message,
    };
  }

  try {
    await connectToDB();

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return {
        success: false,
        errMessage: 'User does not exist',
      };
    }

    existingUser.password = validatedFields.data.password;
    existingUser.passwordConfirm = validatedFields.data.passwordConfirm;
    existingUser.resetToken = undefined;
    existingUser.resetTokenExpires = undefined;

    await existingUser.save();

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      errMessage: 'Something went wrong! Try again later...',
    };
  }
};
