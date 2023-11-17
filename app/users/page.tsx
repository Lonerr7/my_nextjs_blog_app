import { getUsers } from '@/services/userServices';
import { IUser } from '@/types/userTypes';
import UserSm from '../components/Users/UserSm';

const Users = async () => {
  const users: IUser[] | string = await getUsers();

  return (
    <ul>
      {typeof users === 'object' &&
        users.map((user) => <UserSm key={user._id} />)}
    </ul>
  );
};

export default Users;
