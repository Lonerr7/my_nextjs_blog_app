import Link from 'next/link';
import { FC } from 'react';
import Avatar from './Avatar';

const UserSm: FC = () => {
  return (
    <li>
      <Link href="/">
        <Avatar />
        <div>
          <p>Name Surname</p>
          <p>status</p>
        </div>
      </Link>
    </li>
  );
};

export default UserSm;
