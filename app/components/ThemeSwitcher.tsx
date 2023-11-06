'use client';

import { FC, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import swithcerLoading from '@/public/swithcer_loading.svg';
import swithcerLight from '@/public/swithcer_light.svg';
import swithcerDark from '@/public/swithcer_dark.svg';

const ThemeSwitcher: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src={swithcerLoading}
        alt="theme swithcer"
        style={{ width: 'auto', height: 'auto' }}
      />
    );
  }

  return (
    <button
    className='mr-4'
      onClick={() => {
        resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark');
      }}
    >
      <Image
        src={resolvedTheme === 'light' ? swithcerLight : swithcerDark}
        alt="theme swithcer"
        style={{ width: 'auto', height: 'auto' }}
      />
    </button>
  );
};

export default ThemeSwitcher;
