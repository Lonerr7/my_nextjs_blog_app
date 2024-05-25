import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { connectToDB } from '@/utils/connectToDB';
import User from '@/models/User';
import { comparePassword } from '@/utils/comparePassword';

export const authConfig: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
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

        if (credentials.password !== credentials.passwordConfirm) {
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
          ) {
            // Resetting resetToken and resetTokenExpires fields if user previously used logic of forget password and remembered his password
            if (
              userToBeLoggedIn.resetToken &&
              userToBeLoggedIn.resetTokenExpires
            ) {
              userToBeLoggedIn.resetToken = undefined;
              userToBeLoggedIn.resetTokenExpires = undefined;
              await userToBeLoggedIn.save({ validateBeforeSave: false });
            }

            // 1.1) If yes - log in the user by returning it
            return userToBeLoggedIn;
          }
        }

        // Если мы проверили пользователя и его нельзя авторизовать или пользователя нет в БД
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user._id,
          username: user.username,
        };
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          email: undefined,
        },
      };
    },
    signIn() {
      return true;
    },
  },

  pages: {
    signIn: '/signup',
  },
};
