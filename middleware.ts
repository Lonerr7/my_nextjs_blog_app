export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/users',
    '/users/:userId*',
    '/edit',
    '/edit/profile-picture',
    '/edit/delete-my-profile',
    '/edit/change-password',
    '/blogposts',
    '/blogposts/:blogpostId*',
  ],
};
