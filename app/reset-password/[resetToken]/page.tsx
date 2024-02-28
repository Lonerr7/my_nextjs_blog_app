'use client';

import { verifyPasswordResetToken } from '@/services/authServices';
import { IResetPasswordUser } from '@/types/authTypes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  params: {
    resetToken: string;
  };
}

const ResetPassword: FC<Props> = ({ params: { resetToken } }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<IResetPasswordUser | null>(null);
  const [error, setError] = useState('');

  console.log(user);
  

  useEffect(() => {
    (async () => {
      const { errMsg, user } = await verifyPasswordResetToken(resetToken);

      if (errMsg) {
        setError(errMsg);
        return;
      }

      if (user) {
        setUser(user);
      }
    })();

    // eslint-disable-next-line
  }, []);

  if (error) {
    toast.error(error);
  }

  if (session?.user) {
    router.replace('/');
  }

  return <section>ResetPassword</section>;
};

export default ResetPassword;
