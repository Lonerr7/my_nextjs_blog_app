import { IUser } from '@/types/userTypes';
import { FC } from 'react';
import UserSm from './UserSm';
import { getUsers } from '@/services/userServices';

interface Props {
  query: string;
}

const UsersList: FC<Props> = async ({ query }) => {
  const users: IUser[] | string = await getUsers(query);

  return (
    <ul className="grid grid-cols-3 gap-6">
      {typeof users === 'object' &&
        users.map((user) => (
          <UserSm
            key={user._id}
            username={user.username}
            status={user.status}
            avatarUrl={user.image}
          />
        ))}
    </ul>
  );
};

export default UsersList;
