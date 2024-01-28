'use client';

import { useFormStatus } from 'react-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

interface Props {
  isLiked: string | false;
}

const LikeDislikePendingBtn: React.FC<Props> = ({ isLiked }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`mr-2 ${pending && 'opacity-70'}`}
      type="submit"
      disabled={pending}
    >
      {isLiked && isLiked.length !== 0 ? (
        <FaHeart size={20} />
      ) : (
        <FaRegHeart size={20} />
      )}
    </button>
  );
};

export default LikeDislikePendingBtn;
