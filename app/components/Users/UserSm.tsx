import Link from 'next/link';
import { FC } from 'react';
import Avatar from './NextImageVithViewer';

interface Props {
  id: string;
  username: string;
  avatarUrl?: string;
  status?: string;
}

const UserSm: FC<Props> = ({ id, username, avatarUrl, status }) => {
  return (
    <li className="border border-solid border-black rounded-xl dark:border-white">
      <Link
        className="flex items-center p-3 dark:text-white"
        href={`/users/${id}`}
      >
        <Avatar customClassName="mr-4" avatarURL={avatarUrl} small />
        <div className="min-h-[60px]">
          <p className="font-bold mb-2">{username}</p>
          <p>
            {status && status.length > 30
              ? `${status.slice(0, 30)}...`
              : status}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default UserSm;
