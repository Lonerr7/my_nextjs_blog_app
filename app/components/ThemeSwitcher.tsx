'use client';

import { FC } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher: FC = () => {
  const { theme, forcedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        theme === 'dark' ? setTheme('light') : setTheme('dark');
      }}
    >
      ThemeSwitcher
    </button>
  );
};

export default ThemeSwitcher;
