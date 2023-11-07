import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { connectToDB } from '@/utils/connectToDB';

export const authConfig: AuthOptions = {
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
        }, //!
      },
      async authorize(credentials) {
        if (!credentials?.email || credentials?.password) {
          return null;
        }

        await connectToDB();

        // Если мы проверили пользователя и его нельзя авторизовать
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
};
