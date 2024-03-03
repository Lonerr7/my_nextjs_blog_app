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
          Change my profile picture
        </Link>
      </li>
      <li>
        <Link
          className={clsx(
            'link mb-3 dark:text-white text-light-black hover:!text-red-500 hover:opacity-100',
            {
              'font-bold text-red-500 hover:opacity-70':
                pathname === '/my-page/edit/delete-my-profile',
            }
          )}
          href="/my-page/edit/delete-my-profile"
        >
          Delete my profile
        </Link>
      </li>
      <li>
        <GoBack customClassName="relative" />
      </li>
    </ul>
  );
};

export default EditMyInfoNav;
