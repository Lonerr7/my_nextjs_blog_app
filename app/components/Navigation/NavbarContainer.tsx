import { FC } from 'react';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/configs/auth';
import { getSingleUser } from '@/services/userServices';
import { RequestTags } from '@/types/requestTypes';
import Navbar from './Navbar';

const NavbarContainer: FC = async () => {
  const session = await getServerSession(authConfig);
  let userDoc = session?.user
    ? await getSingleUser(session?.user.id!, RequestTags.GET_ME, false)
    : undefined;

  return <Navbar session={session} userDoc={userDoc} />;
};

export default NavbarContainer;
