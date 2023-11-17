import { FC } from 'react';

import mockAvatar from '@/public/mockAvatar.jpg';
import Image from 'next/image';

interface Props {
  avatarURL?: string;
  small?: boolean;
}

const Avatar: FC<Props> = ({ avatarURL, small }) => {
  let width: number;
  let height: number;

  if (small) {
    width = 50;
    height = 50;
  } else {
    width = 150;
    height = 150;
  }

  return (
    <Image
      src={avatarURL ? avatarURL : mockAvatar}
      width={width}
      height={height}
      alt="avatar"
    />
  );
};

export default Avatar;
