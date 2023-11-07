import type { Metadata } from 'next';
import { workSans } from './ui/fonts';
import './globals.css';
import './reset.css';
import Providers from './components/Providers';
import Navbar from './components/Navigation/Navbar';
import Header from './components/semantic/Header';
import Main from './components/semantic/Main';
import Footer from './components/semantic/Footer';

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
      <body
        className={`${workSans.className} antialiased flex flex-col h-screen justify-between dark:bg-bg-dark`}
      >
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
