import { FC } from 'react';
import SignUpForm from '../components/auth/SignUpForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authConfig } from '@/configs/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Meta Blog',
  description: 'Sign up to your account',
};

const SignUp: FC = async () => {
  const session = await getServerSession(authConfig);

  if (session) {
    redirect('/');
  }

  return (
    <section>
      <h1 className="text-5xl text-center font-bold mb-10">Sign Up</h1>
      <SignUpForm />
    </section>
  );
};

export default SignUp;
