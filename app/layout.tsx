import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './reset.css';
import './globals.css';
import Providers from './components/Providers';
import Navbar from './components/Navigation/Navbar';
import Header from './components/semantic/Header';
import Main from './components/semantic/Main';
import Footer from './components/semantic/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Blog App',
  description: 'A Blog Social Media Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header>
            <Navbar />
          </Header>
          <Main>{children}</Main>
          <Footer>Footer</Footer>
        </Providers>
      </body>
    </html>
  );
}
