import Link from 'next/link';
import { FC } from 'react';

const UserSm: FC = () => {
  return (
    <li>
      <Link href="/">
        <div>{/* photo */}</div>
        <div>
          <p>Name Surname</p>
          <p>status</p>
        </div>
      </Link>
    </li>
  );
};

export default UserSm;
