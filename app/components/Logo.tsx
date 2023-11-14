'use client';

import Image from 'next/image';
import { FC } from 'react';
import { useTheme } from 'next-themes';
import 'react-loading-skeleton/dist/skeleton.css';

import logoDark from '@/public/logo_sm_dark.svg';
import logoLight from '@/public/logo_sm_light.svg';
import logoBlueIcon from '@/public/logo_blue.svg';
import Skeleton from 'react-loading-skeleton';

interface Props {
  logoWidth?: number;
  logoHeight?: number;
  logoBlue?: boolean;
}

const Logo: FC<Props> = ({ logoHeight, logoWidth, logoBlue }) => {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) {
    return (
      <div className="w-36 h-36">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  // Todo: доделать лого (текст и его размеры динамически через пропсы)

  return (
    <Image
      className="mr-[10px]"
      src={
        resolvedTheme === 'light'
          ? logoBlue
            ? logoBlueIcon
            : logoLight
          : logoDark
      }
      alt="logo"
      width={logoWidth || 36}
      height={logoHeight || 36}
      priority
    />
  );
};

export default Logo;
