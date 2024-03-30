'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';
import { SlLogout } from 'react-icons/sl';

const SignOut: FC = () => {
  return (
    <>
      <button className="link md:hidden" onClick={() => signOut()}>
        Sign Out
      </button>
      <button className="link !hidden md:!block" onClick={() => signOut()}>
        <SlLogout size={20} />
      </button>
    </>
  );
};

export default SignOut;
