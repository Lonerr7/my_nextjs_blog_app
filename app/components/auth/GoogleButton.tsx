'use client';

import { FC } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton: FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <button
      className="w-[48%] flex items-center rounded-md p-2 shadow-lg bg-google-blue text-white transition delay-30 hover:opacity-80 xsm:w-full xsm:justify-center"
      onClick={() => signIn('google', { callbackUrl })}
    >
      <FcGoogle className="mr-4" size={24} />
      <span className="font-medium">Sign In With Google</span>
    </button>
  );
};

export default GoogleButton;
