import ChangePasswordForm from '@/app/components/my-page/ChangePasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change password | Meta Blog',
  description: 'The page where you can change your password',
};

const ChangePasswordPage = () => {
  return (
    <section>
      <h1 className="page-title">Change password</h1>
      <ChangePasswordForm />
    </section>
  );
};

export default ChangePasswordPage;
