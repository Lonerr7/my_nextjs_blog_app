'use server';

import User from '@/models/User';
import { IUser } from '@/types/userTypes';
import { connectToDB } from '@/utils/connectToDB';
import { z } from 'zod';

const RegisterFormSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be 3 characters or more')
      .max(20, 'Username must not be more than 20 characters'),
    email: z.string().email().min(1, 'Enter your email!'),
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

export const registerUserAction = async (inputData: {
  [key: string]: FormDataEntryValue | null;
}) => {
  const validatedFields = RegisterFormSchema.safeParse(inputData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);

    return {
      message: validatedFields.error.issues[0].message,
    };
  }

  try {
    await connectToDB();
    const [userByEmail, userByUsername] = await Promise.all([
      User.exists({ email: inputData.email }),
      User.exists({ username: inputData.username }),
    ]);

    if (!userByEmail && !userByUsername) {
      const newUser = await User.create({
        email: inputData.email,
        username: inputData.username,
        password: inputData.password,
        passwordConfirm: inputData.passwordConfirm,
      });

      // resetting the password so we don't return it (we take password from the input to log the user in)
      newUser.password = undefined;

      return { user: newUser as IUser };
    }

    // if user exist return error message as a response
    return {
      message: 'The user already exists!',
    };
  } catch (error: any) {
    console.log(`from here: error: `, error);

    return {
      message: 'Unexpected Error!',
    };
  }
};
