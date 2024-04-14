import type { Metadata } from 'next';
import { workSans, sourceSerifPro } from './ui/fonts';
import './globals.css';
import './reset.css';
import Providers from './components/Providers';
import NavbarContainer from './components/Navigation/NavbarContainer';
import Header from './components/semantic/Header';
import Main from './components/semantic/Main';
import Footer from './components/semantic/Footer';
import { Session } from 'next-auth';

export const metadata: Metadata = {
  title: 'Home | Meta Blog',
  description: 'A Blog Social Media Application',
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${workSans.className} ${sourceSerifPro.variable} relative antialiased flex flex-col h-screen justify-between bg-bg-light dark:bg-bg-dark transition-colors delay-[30ms]`}
      >
        <Providers session={session}>
          <Header>
            <NavbarContainer />
          </Header>
          <Main>{children}</Main>
          <Footer />
          <div id="app-portal" />
        </Providers>
      </body>
    </html>
  );
}
