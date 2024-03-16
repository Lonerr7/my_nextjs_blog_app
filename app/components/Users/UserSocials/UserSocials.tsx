import { FC } from 'react';
import { UserSocials } from '@/types/userTypes';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';
import UserSocial from './UserSocial';

interface Props {
  socials: UserSocials;
}

const UserSocials: FC<Props> = ({ socials }) => {
  return (
    <ul className="mt-6 flex items-center">
      {socials?.instagram ? (
        <UserSocial
          href={socials.instagram}
          Icon={
            <FaInstagram className="w-[24px] h-[24px] xsm:w-[20px] xsm:h-[20px]" />
          }
        />
      ) : null}
      {socials?.facebook ? (
        <UserSocial
          href={socials.facebook}
          Icon={
            <FaFacebook className="w-[24px] h-[24px] xsm:w-[20px] xsm:h-[20px]" />
          }
        />
      ) : null}
      {socials?.youtube ? (
        <UserSocial
          href={socials.youtube}
          Icon={
            <FaYoutube className="w-[24px] h-[24px] xsm:w-[20px] xsm:h-[20px]" />
          }
        />
      ) : null}
      {socials?.twitter ? (
        <UserSocial
          href={socials.twitter}
          Icon={
            <FaTwitter className="w-[24px] h-[24px] xsm:w-[20px] xsm:h-[20px]" />
          }
        />
      ) : null}
    </ul>
  );
};

export default UserSocials;
