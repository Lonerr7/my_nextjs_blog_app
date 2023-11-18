import { FC } from 'react';

import mockAvatar from '@/public/mockAvatar.jpg';
import Image from 'next/image';

interface Props {
  avatarURL?: string;
  small?: boolean;
  customClassName?: string;
}

const Avatar: FC<Props> = ({ avatarURL, small, customClassName }) => {
  let width: number;
  let height: number;

  if (small) {
    width = 125;
    height = 125;
  } else {
    width = 350;
    height = 350;
  }

  return (
    <Image
      className={`${customClassName} ${small && `rounded-[50%]`}`}
      src={avatarURL ? avatarURL : mockAvatar}
      width={width}
      height={height}
      alt="avatar"
    />
  );
};

export default Avatar;
