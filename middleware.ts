export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/users',
    '/users/:userId*',
    '/my-page',
    '/my-page/edit',
    '/my-page/edit/profile-picture',
    '/blogposts',
    '/blogposts/:blogpostId*',
  ],
};
