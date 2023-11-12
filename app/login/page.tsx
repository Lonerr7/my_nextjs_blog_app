import { FC } from 'react';
import LogInForm from '../components/auth/LogInForm';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import { redirect } from 'next/navigation';

const LoginPage: FC = async () => {
  const session = await getServerSession(authConfig);

  if (session) {
    redirect('/');
  }

  return (
    <div>
      <h1 className="text-5xl text-center font-bold mb-10">Log In</h1>
      <LogInForm />
    </div>
  );
};

export default LoginPage;
