import { authConfig } from '@/configs/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | Meta Blog',
  description:
    'Recieve an email with instructions on how to restore your password.',
};

const ForgotPassword = async () => {
  const session = await getServerSession(authConfig);

  if (session) {
    redirect('/');
  }

  return (
    <section>
      <h1 className="text-5xl text-center font-bold mb-10">Forgot Password</h1>
      <ForgotPasswordForm />
    </section>
  );
};

export default ForgotPassword;
