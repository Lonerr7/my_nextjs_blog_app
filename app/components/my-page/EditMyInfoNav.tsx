'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GoBack from '../common/GoBack';

const EditMyInfoNav = () => {
  const pathname = usePathname();

  return (
    <ul className="fixed top-[160px] z-40">
      <li>
        <Link
          className={clsx('link mb-3 dark:text-white text-light-black', {
            'font-bold': pathname === '/my-page/edit',
          })}
          href="/my-page/edit"
        >
          Edit my general info
        </Link>
      </li>
      <li>
        <Link
          className={clsx('link mb-3 dark:text-white text-light-black', {
            'font-bold': pathname === '/my-page/edit/profile-picture',
          })}
          href="/my-page/edit/profile-picture"
        >
          Chnage my profile picture
        </Link>
      </li>
      <li>
        <GoBack customClassName="relative" />
      </li>
    </ul>
  );
};

export default EditMyInfoNav;
