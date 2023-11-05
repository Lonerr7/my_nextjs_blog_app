'use client';
import { FC } from 'react';

import { ThemeProvider } from 'next-themes';

interface Props {
  children: React.ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return <ThemeProvider enableSystem attribute="class">{children}</ThemeProvider>;
};

export default Providers;
