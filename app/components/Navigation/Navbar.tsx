import { FC } from 'react';
import Logo from '../Logo';
import ThemeSwitcher from '../ThemeSwitcher';
import NavList from './NavList';

const Navbar: FC = () => {
  return (
    <nav className="flex items-center justify-between">
      {/* Logo */}
      <Logo />

      {/* Navbar */}
      <NavList />

      {/* Profile or Login with Theme Swithcer */}
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;
