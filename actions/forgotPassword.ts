'use server';

import User from '@/models/User';
import { connectToDB } from '@/utils/connectToDB';
import { z } from 'zod';
import crypto from 'crypto';
import { sendEmail } from '@/utils/sendEmail';
import { getCorrectDateTime } from '@/utils/getCorrectTimeDate';

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
  const user = await User.findOne({ email });
  console.log(user);

  try {
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

    const passwordResetExpires = getCorrectDateTime() + 3600000; //! Дата ставится некорректно: на 2 часа раньше нужного

    user.resetToken = passwordResetToken;
    user.resetTokenExpires = passwordResetExpires;

    // await user.save();

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;
    const message = `Forgot your password? Click this link to update your password: <${resetUrl}>.  
    \nIf you didn't - ignore this message!`;

    // throw new Error('eeee');

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

    return {
      errMessage: 'Something went wrong! Please try again later!',
    };
  } finally {
    await user.save({ validateBeforeSave: false });
  }
};
