'use client';

import Link from 'next/link';
import { FC } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const NavList: FC = () => {
  const pathname = usePathname();

  return (
    <ul className="w-2/5 flex justify-between">
      <li className="mr-2">
        <Link
          className={clsx('link dark:text-white text-light-black', {
            'font-bold': pathname === '/',
          })}
          href="/"
        >
          Home
        </Link>
      </li>
      <li className="mr-2">
        <Link
          className={clsx('link dark:text-white text-light-black', {
            'font-bold': pathname === '/my-page',
          })}
          href="/my-page"
        >
          My Page
        </Link>
      </li>
      <li className="mr-2">
        <Link
          className={clsx('link dark:text-white text-light-black', {
            'font-bold': pathname === '/users',
          })}
          href="/users"
        >
          Users
        </Link>
      </li>
      <li className="mr-2">
        <Link
          className={clsx('link dark:text-white text-light-black', {
            'font-bold': pathname === '/blogposts',
          })}
          href="/blogposts"
        >
          Blogs
        </Link>
      </li>
      <li className="mr-2">
        <Link
          className={clsx('link dark:text-white text-light-black', {
            'font-bold': pathname === '/create-blogpost',
          })}
          href="/create-blogpost"
        >
          Create Post
        </Link>
      </li>
    </ul>
  );
};

export default NavList;
