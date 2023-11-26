import { IUser } from '@/types/userTypes';
import { FC } from 'react';
import Avatar from './Avatar';
import { SlPencil } from 'react-icons/sl';
import Link from 'next/link';
import UserSocials from './UserSocials/UserSocials';

interface Props {
  isMyPage?: boolean;
  user?: IUser;
}

const UserInfo: FC<Props> = ({ isMyPage, user }) => {
  return (
    <div className="relative py-12 px-6 bg-light-gray rounded-xl dark:bg-dark-blue">
      {isMyPage ? (
        <Link
          className="dark:text-white transition-opacity delay-[40ms] hover:opacity-60"
          href="/my-page/edit"
          title="Edit my page"
        >
          <SlPencil className="absolute top-5 right-5" size={20} />
        </Link>
      ) : null}

      <div className="mx-auto flex flex-col items-center max-w-[668px]">
        <div className="flex items-center mb-6">
          <Avatar
            customClassName="mr-4"
            avatarURL={user?.image}
            small
            fullscreen
          />
          <div>
            <p className="text-xl font-medium	mb-2">{user?.username}</p>
            <p className="dark:text-dark-gray">
              {user?.job ? user?.job : 'Unemployed'}
            </p>
          </div>
        </div>

        {user?.status ? (
          <p className="text-center text-text-gray dark:text-dark-gray text-lg leading-[1.625rem]">
            {user.status}
          </p>
        ) : null}

        {user?.socials ? <UserSocials socials={user.socials} /> : null}
      </div>
    </div>
  );
};

export default UserInfo;
