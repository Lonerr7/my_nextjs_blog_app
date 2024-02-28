'use server';

import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { z } from 'zod';
import crypto from 'crypto';
import { sendEmail } from '@/utils/sendEmail';

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

  await connectToDB();
  let user;

  try {
    user = await User.findOne({ email });
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

    const passwordResetExpires = Date.now() + 3600000 * 5; // Только при умножении на 5 получается продлить срок действия на 2 часа вперед

    user.resetToken = passwordResetToken;
    user.resetTokenExpires = passwordResetExpires;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;
    const message = `Forgot your password? Click this link to update your password: <${resetUrl}>.  
    \nIf you didn't - ignore this message!`;

    await sendEmail({
      message,
      subject: 'Forgot your password',
      to: validatedFields.data.email,
    });

    return {
      successMsg: `We have sent further information to: ${email}`,
    };
  } catch (error) {
    console.error(error);

    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return {
      errMessage: 'Something went wrong! Please try again later!',
    };
  }
};
