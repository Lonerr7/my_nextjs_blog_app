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
import { IUser } from '@/types/userTypes';

const Navbar: FC = async () => {
  const session = await getServerSession(authConfig);
  const user: string | IUser = await getSingleUser(session?.user.id!, 'myself');

  console.log(`navbar session`, session);

  return (
    <nav className="flex items-center justify-between text-xl">
      {/* Logo */}
      <Link className="flex items-center" href="/">
        <Logo />
        <span
          className={`${plusJakartaSans.className} text-xl dark:text-white`}
        >
          Meta <span>Blog</span>
        </span>
      </Link>

      {/* Navbar */}
      {session && <NavList />}

      {/* Profile or Login with Theme Swithcer */}
      <div className="flex items-center justify-between">
        <ThemeSwitcher />
        {session && (
          <Link className="link mr-4 dark:text-white" href="/my-page">
            Hello,{' '}
            <span className="font-bold">
              {typeof user !== 'string' && user.username}
            </span>
          </Link>
        )}
        {session && <SignOut />}
      </div>
    </nav>
  );
};

export default Navbar;
