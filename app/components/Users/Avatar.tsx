import { FC } from 'react';

interface Props {
  avatarURL?: string;
}

const Avatar: FC<Props> = ({ avatarURL }) => {
  return <div>Avatar</div>;
};

export default Avatar;
