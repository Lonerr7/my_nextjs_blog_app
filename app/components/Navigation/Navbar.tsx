import { FC } from 'react';
import Logo from '../Logo';
import ThemeSwitcher from '../ThemeSwitcher';
import NavList from './NavList';
import SignOut from '../common/SignOut';
import { getServerSession } from 'next-auth/next';
import { plusJakartaSans } from '@/app/ui/fonts';
import Link from 'next/link';

const Navbar: FC = async () => {
  const session = await getServerSession();

  return (
    <nav className="flex items-center justify-between">
      {/* Logo */}
      <Link className="flex items-center" href="/">
        <Logo />
        <span className={`${plusJakartaSans.className} text-xl`}>
          Meta <span>Blog</span>
        </span>
      </Link>

      {/* Navbar */}
      {session && <NavList />}

      {/* Profile or Login with Theme Swithcer */}
      <div className="flex items-center justify-between">
        <ThemeSwitcher />
        {session && <SignOut />}
      </div>
    </nav>
  );
};

export default Navbar;
