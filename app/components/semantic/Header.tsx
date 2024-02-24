'use client';

import { FC, ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

const Header: FC<Props> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <header
      className={`transition-[background-color] duration-100 py-8 fixed w-full z-10 ${
        isScrolled && 'bg-scrolled-header-light dark:bg-scrolled-header-dark'
      }`}
    >
      <div className="app-container">{children}</div>
    </header>
  );
};

export default Header;
