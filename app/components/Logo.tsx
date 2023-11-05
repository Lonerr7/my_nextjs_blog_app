import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import logo from '@/public/logo_sm.svg';

const Logo: FC = () => {
  return (
    <Link href="/">
      <Image src={logo} alt="logo" width={36} height={36} />
      text
    </Link>
  );
};

export default Logo;
