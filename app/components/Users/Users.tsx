import { IUser } from '@/types/userTypes';
import { FC } from 'react';
import UserSm from './UserSm';
import { getUsers } from '@/services/userServices';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';

interface Props {
  query: string;
  currentPage: number;
}

const UsersList: FC<Props> = async ({ query, currentPage }) => {
  const [users, session] = await Promise.all([
    getUsers(query, currentPage),
    getServerSession(authConfig),
  ]);

  return (
    <ul className="grid grid-cols-3 gap-6">
      {typeof users === 'object' &&
        users.map((user) => (
          <UserSm
            key={user._id}
            isMe={session?.user.id === user._id}
            id={user._id}
            username={user.username}
            status={user.status}
            avatarUrl={user.image?.imageUrl}
          />
        ))}
    </ul>
  );
};

export default UsersList;
