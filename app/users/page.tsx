import { getUsers } from '@/services/userServices';
import { IUser } from '@/types/userTypes';
import UserSm from '../components/Users/UserSm';
import Search from '../components/common/Search';

const Users = async () => {
  const users: IUser[] | string = await getUsers();

  return (
    <section>
      <Search palceholder="Search for a user" />
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
    </section>
  );
};

export default Users;
