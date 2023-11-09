import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { connectToDB } from '@/utils/connectToDB';
import User from '@/models/User';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/adapters/mongoDBAdapter';
import { comparePassword } from '@/utils/comparePassword';

export const authConfig: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {}),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
        passwordConfirm: {
          label: 'Confirm your password',
          type: 'password',
          required: true,
        },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.passwordConfirm
        ) {
          return null;
        }

        await connectToDB();
        const userToBeLoggedIn = await User.findOne({
          email: credentials.email,
        }).select('+password');

        if (userToBeLoggedIn) {
          // 1) Check if user's password === password a user has entered
          if (
            await comparePassword(
              credentials.password,
              userToBeLoggedIn.password
            )
          )
            return userToBeLoggedIn;
        }

        // Если мы проверили пользователя и его нельзя авторизовать
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
};
