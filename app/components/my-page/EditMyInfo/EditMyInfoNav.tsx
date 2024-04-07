'use client';

import { useBurger } from '@/hooks/useBurger';
import BurgerBtn from '../../ui/BurgerBtn/BurgerBtn';
import EditMyInfoNavList from './EditMyInfoNavList';
import { RiMenuFoldFill } from 'react-icons/ri';

const EditMyInfoNav = () => {
  const { isMenuOpen, closeMenu, toggleMenuHandler } = useBurger();

  return (
    <nav className="w-[202px] h-[145px] mt-4 mr-4 2md:w-auto 2md:h-auto relative">
      <BurgerBtn
        customClassName={`!fixed hidden  ${
          isMenuOpen ? '!z-[801]' : '!z-auto'
        } 2md:block`}
        toggleMenuHandler={toggleMenuHandler}
        customBurgerIcon={<RiMenuFoldFill className="w-[30px] h-[30px]" />}
      />

      <EditMyInfoNavList isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </nav>
  );
};

export default EditMyInfoNav;
