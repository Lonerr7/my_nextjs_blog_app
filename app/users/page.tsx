import { getUsers } from '@/services/userServices';
import { IUser } from '@/types/userTypes';

const Users = async () => {
  const users: IUser[] | string = await getUsers();

  return (
    <div>
      {typeof users === 'object' &&
        users.map((user) => <div key={user._id}>{user.username}</div>)}
    </div>
  );
};

export default Users;
