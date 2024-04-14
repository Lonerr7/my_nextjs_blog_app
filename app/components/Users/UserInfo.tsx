import { IUser } from '@/types/userTypes';
import { FC } from 'react';
import { FaGear } from 'react-icons/fa6';
import Link from 'next/link';
import UserSocials from './UserSocials/UserSocials';
import NextImageVithViewer from './NextImageVithViewer';

interface Props {
  isMyPage?: boolean;
  user?: IUser;
}

const UserInfo: FC<Props> = ({ isMyPage, user }) => {
  return (
    <div className="relative py-12 px-6 mb-12 bg-light-gray rounded-xl dark:bg-dark-blue xsm:py-6 xsm:mb-6">
      {isMyPage ? (
        <Link
          className="dark:text-white transition-opacity delay-[40ms] hover:opacity-60"
          href="/edit"
          title="Edit my page"
        >
          <FaGear className="absolute top-5 right-5 w-[24px] h-[24px] xsm:w-[20px] xsm:h-[20px]" />
        </Link>
      ) : null}

      <div className="mx-auto flex flex-col items-center max-w-[668px]">
        <div className="flex items-center mb-6">
          <NextImageVithViewer
            customClassName="mr-4 min-w-[125px] min-h-[125px] xsm:min-w-[100px] xsm:min-h-[100px] xxsm:min-w-[75px] xxsm:min-h-[75px]"
            imageUrl={user?.image?.imageUrl}
            small
            alt="avatar"
            fullscreen
            sizes="200px"
          />
          <div>
            <p className="text-xl font-medium	mb-2 xsm:text-[18px]">
              {user?.username}
            </p>
            <p className="dark:text-dark-gray xsm:text-sm">
              {user?.job ? user?.job : 'Unemployed'}
            </p>
          </div>
        </div>

        {user?.status ? (
          <p className="text-center text-text-gray dark:text-dark-gray text-lg leading-[1.625rem] xsm:text-base">
            {user.status}
          </p>
        ) : null}

        {user?.socials ? <UserSocials socials={user.socials} /> : null}
      </div>
    </div>
  );
};

export default UserInfo;
