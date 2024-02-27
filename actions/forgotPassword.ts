'use server';

import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { z } from 'zod';
import crypto from 'crypto';

const ForgotPasswordValidationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email cannot be that short')
    .email('Please, enter a valid email'),
});

export const forgotPassword = async (formData: FormData) => {
  const email = formData.get('email');

  // Validating input fields before sendning a request
  const validatedFields = ForgotPasswordValidationSchema.safeParse({ email });

  if (!validatedFields.success) {
    return {
      errMessage: validatedFields.error.issues[0].message,
    };
  }

  try {
    await connectToDB();
    const user = await User.findOne({ email });

    // 1. Checking if user with entered email exists in DB
    if (!user) {
      console.log('User with this email does not exist!');

      return {
        errMessage: 'User with this email does not exist!',
      };
    }

    // 2. Creating password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const passwordResetExpires = Date.now() + 3600000;

    user.resetToken = passwordResetToken;
    user.resetTokenExpires = passwordResetExpires;

    // await user.save();

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;
    console.log(resetUrl);
  } catch (error) {
    console.error(error);

    return {
      errMessage: 'Something went wrong! Please try again later!',
    };
  }
};
