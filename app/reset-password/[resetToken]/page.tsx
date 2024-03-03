'use client';

import ResetPasswordForm from '@/app/components/auth/ResetPasswordForm';
import Preloader from '@/app/components/common/Preloader';
import { verifyPasswordResetToken } from '@/services/authServices';
import { IResetPasswordUser } from '@/types/authTypes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Props {
  params: {
    resetToken: string;
  };
}

const ResetPassword: FC<Props> = ({ params: { resetToken } }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<IResetPasswordUser | null>(null);
  const [validating, setValidating] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const { errMsg, user } = await verifyPasswordResetToken(resetToken);

      if (errMsg) {
        setError(errMsg);
        setValidating(false);
        return;
      }

      if (user) {
        setUser(user);
        setValidating(false);
      }
    })();

    // eslint-disable-next-line
  }, []);

  if (session?.user) {
    router.replace('/');
  }

  return (
    <section>
      <h1 className="auth-page-title">Reset Password</h1>

      {validating ? (
        <Preloader customClassName="flex justify-center" />
      ) : error ? (
        <div className="text-center text-lg text-red-500 font-bold">
          <p>Error: {error}</p>
          <p className="mb-6">Try creating a new password reset token again!</p>
          <Link className="form-btn-2 !w-1/2 mx-auto" href="/forgot-password">
            Send password reset token again
          </Link>
        </div>
      ) : (
        <ResetPasswordForm userId={user?.id!} router={router} />
      )}
    </section>
  );
};

export default ResetPassword;
