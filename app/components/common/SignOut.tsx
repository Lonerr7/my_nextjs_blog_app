'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';

const SignOut: FC = () => {
  return (
    <button className="link" onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export default SignOut;
