import { IUser } from '@/types/userTypes';
import { FC } from 'react';
import UpdateUserForm from './UpdateUserForm';

interface Props {
  isMyPage?: boolean;
  user?: IUser;
}

const UserInfo: FC<Props> = ({ isMyPage, user }) => {
  return (
    <div>
      {user ? (
        <>
          <p>{user?.username}</p>
          {isMyPage ? <UpdateUserForm user={user} /> : null}
        </>
      ) : null}
    </div>
  );
};

export default UserInfo;
