export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/users',
    '/my-page',
    '/my-page/edit',
    '/my-page/edit/profile-picture',
  ],
};
