'use client';

import { FC } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const GoogleButton: FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <button onClick={() => signIn('google', { callbackUrl })}>
      Sign In With Google
    </button>
  );
};

export default GoogleButton;
