import NextAuth, { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      username: string;
      email: string;
      id: string;
      image?: string;
    };
  }

  interface User extends DefaultUser {
    _id: string;
    username: string;
    email: string;
    image?: string;
  }
}
