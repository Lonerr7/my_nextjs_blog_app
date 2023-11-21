import { Metadata } from 'next';
import { FC } from 'react';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import { getSingleUser } from '@/services/userServices';
import { IUser } from '@/types/userTypes';
import UserInfo from '../components/Users/UserInfo';

export const metadata: Metadata = {
  title: 'My Page | Meta Blog',
};

const MyPage: FC = async () => {
  const session = await getServerSession(authConfig);
  const user: IUser | string = await getSingleUser(session?.user.id!, 'myself');

  if (typeof user === 'string') {
    return (
      <section>
        <p>{user}</p>
      </section>
    );
  }

  return (
    <section>
      <UserInfo user={user} isMyPage />
    </section>
  );
};

export default MyPage;
