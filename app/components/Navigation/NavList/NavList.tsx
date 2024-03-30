'use client';

import s from './NavList.module.css';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import NavListItem from './NavListItem';

const navListItems = [
  {
    pathnameValue: '/',
    textValue: 'My Page',
  },
  {
    pathnameValue: '/users',
    textValue: 'Users',
  },
  {
    pathnameValue: '/blogposts',
    textValue: 'Blogs',
  },
  {
    pathnameValue: '/create-blogpost',
    textValue: 'Create Post',
  },
];

interface Props {
  isOpen: boolean;
  closeMenu: () => void
}

const NavList: FC<Props> = ({ isOpen, closeMenu }) => {
  const pathname = usePathname();

  return (
    <ul
      className={
        isOpen
          ? `${s.navList} bg-scrolled-header-light dark:bg-scrolled-header-dark`
          : `${s.navList} ${s.closed}`
      }
    >
      {navListItems.map((listItem, i) => (
        <NavListItem
          key={i}
          isOpen={isOpen}
          closeMenu={closeMenu}
          customClassName={s.navList__item}
          pathname={pathname}
          pathnameValue={listItem.pathnameValue}
          textValue={listItem.textValue}
        />
      ))}
    </ul>
  );
};

export default NavList;
