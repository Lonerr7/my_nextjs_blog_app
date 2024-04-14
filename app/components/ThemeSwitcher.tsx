'use client';

import { FC, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import swithcerLoading from '@/public/swithcer_loading.svg';
import swithcerLight from '@/public/swithcer_light.svg';
import swithcerDark from '@/public/swithcer_dark.svg';

interface Props {
  customClassName?: string;
}

const ThemeSwitcher: FC<Props> = ({ customClassName }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        className={`mr-4 w-auto h-auto lg:w-[35px] ${customClassName}`}
        src={swithcerLoading}
        alt="theme swithcer"
      />
    );
  }

  return (
    <button
      className={`mr-4 ${customClassName}`}
      onClick={() => {
        resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark');
      }}
    >
      <Image
        className="w-auto h-auto lg:w-[35px]"
        src={resolvedTheme === 'light' ? swithcerLight : swithcerDark}
        alt="theme swithcer"
      />
    </button>
  );
};

export default ThemeSwitcher;
