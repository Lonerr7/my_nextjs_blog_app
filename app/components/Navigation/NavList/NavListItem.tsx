import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

interface Props {
  customClassName?: string;
  textValue: string;
  pathname: string;
  pathnameValue: string;
  isOpen: boolean;
  closeMenu: () => void;
}

const NavListItem: React.FC<Props> = ({
  customClassName,
  textValue,
  pathname,
  pathnameValue,
  isOpen,
  closeMenu,
}) => {
  return (
    <li
      className={customClassName}
      onClick={() => {
        if (isOpen) {
          console.log(`if is Open`);
          
          closeMenu();
        }
      }}
    >
      <Link
        className={clsx('link dark:text-white text-light-black', {
          'font-bold': pathname === pathnameValue,
        })}
        href={pathnameValue}
      >
        {textValue}
      </Link>
    </li>
  );
};

export default NavListItem;
