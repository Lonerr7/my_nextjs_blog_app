import { FC } from 'react';
import Logo from '../Logo';
import ThemeSwitcher from '../ThemeSwitcher';
import NavList from './NavList';
import SignOut from '../common/SignOut';
import { getServerSession } from 'next-auth/next';

const Navbar: FC = async () => {
  const session = await getServerSession();

  return (
    <nav className="flex items-center justify-between">
      {/* Logo */}
      <Logo />

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
