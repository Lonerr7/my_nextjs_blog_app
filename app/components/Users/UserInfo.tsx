import { updateMyUsername } from '@/actions/actions';
import { IUser } from '@/types/userTypes';
import { FC } from 'react';

interface Props {
  isMyPage?: boolean;
  user?: IUser;
}

const UserInfo: FC<Props> = ({ isMyPage, user }) => {
  return (
    <div>
      <p>{user?.username}</p>
      {isMyPage ? (
        <form action={updateMyUsername}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            defaultValue={user?.username}
          />
          <button type="submit">Change Username</button>
        </form>
      ) : null}
    </div>
  );
};

export default UserInfo;
