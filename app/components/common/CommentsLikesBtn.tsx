import { formatNumber } from '@/utils/formatNumber';
import { FC, ReactNode } from 'react';

interface Props {
  customOuterClassName?: string;
  customCounterClassName?: string;
  customNumberClassName?: string;
  value: number;
  IconLiked?: ReactNode;
  IconNotLiked: ReactNode;
  isLiked?: boolean;
  btnType?: 'submit';
  onBtnClick: () => void;
}

const CommentsLikesBtn: FC<Props> = ({
  customOuterClassName,
  customCounterClassName,
  customNumberClassName,
  value,
  IconLiked,
  IconNotLiked,
  isLiked,
  btnType,
  onBtnClick,
}) => {
  return (
    <button
      className={`font-semibold relative ${customOuterClassName}`}
      type={btnType ? btnType : 'button'}
      onClick={onBtnClick}
    >
      {isLiked ? IconLiked : IconNotLiked}
      <span
        className={`absolute top-[-7px] left-[13px] w-[18px] h-[18px] text-[10px] rounded-xl flex flex-col justify-center bg-rose-500 text-white ${customCounterClassName}`}
      >
        <span className={`mb-[1px] ${customNumberClassName}`}>
          {formatNumber(value)}
        </span>
      </span>
    </button>
  );
};

export default CommentsLikesBtn;
