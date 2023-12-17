'use client';

import { FC, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Session } from 'next-auth';

interface Props {
  children: React.ReactNode;
  session: Session;
}

const Providers: FC<Props> = ({ children, session }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SessionProvider>{children}</SessionProvider>;
  }

  return (
    <ThemeProvider enableSystem attribute="class">
      <SessionProvider session={session}>
        <Toaster
          gutter={10}
          toastOptions={{
            className: 'dark:bg-bg-light-dark dark:text-white',
            style: {
              textAlign: 'center',
            },
          }}
        />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
