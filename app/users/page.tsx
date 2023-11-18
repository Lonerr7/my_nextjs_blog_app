import { getUsers } from '@/services/userServices';
import { IUser } from '@/types/userTypes';
import UserSm from '../components/Users/UserSm';

const Users = async () => {
  const users: IUser[] | string = await getUsers();

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

export default Users;
