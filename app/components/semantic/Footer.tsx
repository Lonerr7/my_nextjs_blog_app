import { FC } from 'react';
import Logo from '../Logo';
import Link from 'next/link';
import { plusJakartaSans } from '@/app/ui/fonts';

const Footer: FC = () => {
  return (
    <footer className="py-8">
      <div className="app-container">
        <div className="flex justify-between items-center">
          <Link className={`${plusJakartaSans.className} flex`} href="/">
            <Logo logoBlue />
            <div className="flex flex-col dark:text-white">
              <span className="text-xl">
                Meta <span className="font-extrabold">Blog</span>
              </span>
              <span>All Rights Reserved. © 2023.</span>
            </div>
          </Link>
        </div>

        <ul></ul>
      </div>
    </footer>
  );
};

export default Footer;
