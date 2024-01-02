import { FC } from 'react';
import Logo from '../Logo';
import ThemeSwitcher from '../ThemeSwitcher';
import NavList from './NavList';
import SignOut from '../common/SignOut';
import { getServerSession } from 'next-auth/next';
import { plusJakartaSans } from '@/app/ui/fonts';
import Link from 'next/link';
import { authConfig } from '@/configs/auth';
import { getSingleUser } from '@/services/userServices';

const Navbar: FC = async () => {
  const session = await getServerSession(authConfig);
  let userDoc = session?.user
    ? await getSingleUser(session?.user.id!, 'myself', false)
    : undefined;

  return (
    <nav className="flex items-center justify-between text-xl">
      <Link className="flex items-center" href="/">
        <Logo />
        <span
          className={`${plusJakartaSans.className} text-xl dark:text-white`}
        >
          Meta <span>Blog</span>
        </span>
      </Link>

      {session && <NavList />}

      <div className="flex items-center justify-between">
        <ThemeSwitcher />
        {session && (
          <Link className="link mr-4 dark:text-white" href="/my-page">
            Hello,{' '}
            <span className="font-bold">
              {userDoc?.user && userDoc?.user.username}
            </span>
          </Link>
        )}
        {session && <SignOut />}
      </div>
    </nav>
  );
};

export default Navbar;
