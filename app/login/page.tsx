import { FC } from 'react';
import LogInForm from '../components/auth/LogInForm';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import { redirect } from 'next/navigation';
import GoBack from '../components/common/GoBack';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In | Meta Blog',
  description: 'Log In to your account',
};

const LoginPage: FC = async () => {
  const session = await getServerSession(authConfig);

  if (session) {
    redirect('/');
  }

  return (
    <section className="relative">
      <h1 className="text-5xl text-center font-bold mb-10">Log In</h1>
      <GoBack />
      <LogInForm />
    </section>
  );
};

export default LoginPage;
