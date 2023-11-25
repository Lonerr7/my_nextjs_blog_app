import { IUser } from '@/types/userTypes';
import { FC } from 'react';
import UpdateUserForm from './UpdateUserForm';
import Avatar from './Avatar';

interface Props {
  isMyPage?: boolean;
  user?: IUser;
}

const UserInfo: FC<Props> = ({ isMyPage, user }) => {
  return (
    <div>
      <div className="py-12 px-6 bg-light-gray rounded-xl dark:bg-dark-blue">
        <div className="mx-auto flex flex-col items-center max-w-[668px]">
          <div className="flex items-center mb-6">
            <Avatar customClassName="mr-4" avatarURL={user?.image} small />
            <div>
              <p className="text-xl font-medium	mb-2">{user?.username}</p>
              <p className="dark:text-dark-gray">
                {user?.job ? user.job : 'Unemployed'}
              </p>
            </div>
          </div>

          {user?.status ? (
            <p className="text-center text-text-gray dark:text-dark-gray text-lg leading-[1.625rem]">
              {user.status}
            </p>
          ) : null}

          {true ? <ul className="mt-6">socials</ul> : null}
        </div>
      </div>
      {/* {user ? (
        <>
          <p>{user?.username}</p>
          {isMyPage ? <UpdateUserForm user={user} /> : null}
        </>
      ) : null} */}
    </div>
  );
};

export default UserInfo;
