'use client';

import Link from 'next/link';
import { FC } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const NavList: FC = () => {
  const pathname = usePathname();

  return (
    <ul className="w-2/5 flex justify-between text-xl">
      <li className="mr-2">
        <Link
          className={clsx('dark:text-white text-light-black', {
            'font-bold': pathname === '/',
          })}
          href="/"
        >
          Home
        </Link>
      </li>
      <li className="mr-2">
        <Link
          className={clsx('dark:text-white text-light-black', {
            'font-bold': pathname === '/my-page',
          })}
          href="/my-page"
        >
          My Page
        </Link>
      </li>
      <li className="mr-2">
        <Link
          className={clsx('dark:text-white text-light-black', {
            'font-bold': pathname === '/users',
          })}
          href="/users"
        >
          Users
        </Link>
      </li>
      <li className="mr-2">
        <Link
          className={clsx('dark:text-white text-light-black', {
            'font-bold': pathname === '/blogs',
          })}
          href="/blogs"
        >
          Blogs
        </Link>
      </li>
      <li className="mr-2">
        <Link
          className={clsx('dark:text-white text-light-black', {
            'font-bold': pathname === '/create',
          })}
          href="/create"
        >
          Create Blog
        </Link>
      </li>
    </ul>
  );
};

export default NavList;
