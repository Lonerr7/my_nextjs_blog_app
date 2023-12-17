'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface Props {
  customClassName?: string;
}

const GoBack: FC<Props> = ({ customClassName }) => {
  const router = useRouter();

  return (
    <button
      className={`absolute top-0 left-0 ${customClassName}`}
      type="button"
      title="Go back"
      onClick={() => router.back()}
    >
      <AiOutlineArrowLeft size={30} />
    </button>
  );
};

export default GoBack;
