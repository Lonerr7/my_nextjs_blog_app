import Link from 'next/link';
import { FC } from 'react';
import Avatar from './Avatar';

interface Props {
  username: string;
  avatarUrl?: string;
  status?: string;
}

const UserSm: FC<Props> = ({ username, avatarUrl, status }) => {
  return (
    <li className="border border-solid border-black rounded-xl dark:border-white">
      <Link className="flex items-center p-3 dark:text-white" href="/">
        <Avatar customClassName="mr-4" avatarURL={avatarUrl} small />
        <div className="min-h-[60px]">
          <p className="font-bold">{username}</p>
          <p>{status}</p>
        </div>
      </Link>
    </li>
  );
};

export default UserSm;
