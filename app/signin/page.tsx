import { FC } from 'react';
import SingInForm from '../components/auth/SingInForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authConfig } from '@/configs/auth';

const SignIn: FC = async () => {
  const session = await getServerSession(authConfig);

  if (session) {
    redirect('/');
  }
  return (
    <div>
      <h1 className="text-5xl text-center font-bold mb-10">Sign In</h1>
      <SingInForm />
    </div>
  );
};

export default SignIn;
