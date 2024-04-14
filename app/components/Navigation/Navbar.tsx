'use client';

import { plusJakartaSans } from '@/app/ui/fonts';
import Link from 'next/link';
import Logo from '../Logo';
import ThemeSwitcher from '../ThemeSwitcher';
import NavList from './NavList/NavList';
import SignOut from '../common/SignOut';
import { Session } from 'next-auth';
import { IUser } from '@/types/userTypes';
import BurgerBtn from '../ui/BurgerBtn/BurgerBtn';
import { useBurger } from '@/hooks/useBurger';

interface Props {
  session: Session | null;
  userDoc:
    | {
        user: IUser;
        error?: undefined;
      }
    | {
        error: string;
        user?: undefined;
      }
    | undefined;
}

const Navbar: React.FC<Props> = ({ session, userDoc }) => {
  const { isMenuOpen: isOpen, closeMenu, toggleMenuHandler } = useBurger();

  return (
    <nav className="flex items-center justify-between text-xl">
      <Link className="flex items-center 2md:hidden" href="/">
        <Logo />
        <span
          className={`${plusJakartaSans.className} text-xl dark:text-white lg:hidden`}
        >
          Meta <span>Blog</span>
        </span>
      </Link>

      {session?.user ? (
        <BurgerBtn
          customClassName="hidden 2md:block z-[301]"
          toggleMenuHandler={toggleMenuHandler}
        />
      ) : null}

      {session && <NavList isOpen={isOpen} closeMenu={closeMenu} />}

      <div className="flex items-center justify-between z-[301] 2md:w-full">
        <ThemeSwitcher customClassName="2md:ml-auto" />

        {session && (
          <Link className="link mr-4 dark:text-white" href="/">
            Hello,{' '}
            <span className="font-bold">
              {userDoc?.user && userDoc.user.username}
            </span>
          </Link>
        )}
        {session && <SignOut />}
      </div>
    </nav>
  );
};

export default Navbar;
