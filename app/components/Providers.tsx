'use client';

import { FC, useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <SessionProvider>
      <ThemeProvider enableSystem attribute="class">
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
