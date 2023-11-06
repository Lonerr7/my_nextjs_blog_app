'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { useTheme } from 'next-themes';
import 'react-loading-skeleton/dist/skeleton.css';

import logoDark from '@/public/logo_sm_dark.svg';
import logoLight from '@/public/logo_sm_light.svg';
import Skeleton from 'react-loading-skeleton';

const Logo: FC = () => {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) {
    return (
      <div className="w-158 h-36">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <Link href="/">
      <Image
        src={resolvedTheme === 'light' ? logoDark : logoLight}
        alt="logo"
        width={158}
        height={36}
      />
    </Link>
  );
};

export default Logo;
