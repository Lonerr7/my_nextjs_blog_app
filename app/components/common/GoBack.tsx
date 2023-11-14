'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const GoBack: FC = () => {
  const router = useRouter();

  return (
    <button
      className="absolute top-0 left-0"
      type="button"
      title="Go back"
      onClick={() => router.back()}
    >
      <AiOutlineArrowLeft size={30} />
    </button>
  );
};

export default GoBack;
