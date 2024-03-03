export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/users',
    '/users/:userId*',
    '/my-page',
    '/my-page/edit',
    '/my-page/edit/profile-picture',
    '/my-page/edit/delete-my-profile',
    '/blogposts',
    '/blogposts/:blogpostId*',
  ],
};
