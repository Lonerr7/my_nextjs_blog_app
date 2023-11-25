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
        <UserSocial href={socials.instagram} Icon={<FaInstagram size={24} />} />
      ) : null}
      {socials?.facebook ? (
        <UserSocial href={socials.facebook} Icon={<FaFacebook size={24} />} />
      ) : null}
      {socials?.youtube ? (
        <UserSocial href={socials.youtube} Icon={<FaYoutube size={24} />} />
      ) : null}
      {socials?.twitter ? (
        <UserSocial href={socials.twitter} Icon={<FaTwitter size={24} />} />
      ) : null}
    </ul>
  );
};

export default UserSocials;
