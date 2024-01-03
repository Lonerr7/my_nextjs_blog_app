import { Metadata } from 'next';
import { FC } from 'react';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import { getSingleUser } from '@/services/userServices';
import UserInfo from '../components/Users/UserInfo';
import UserBlogposts from '../components/Users/UserBlogposts/UserBlogposts';

export const metadata: Metadata = {
  title: 'My Page | Meta Blog',
};

const MyPage: FC = async () => {
  const session = await getServerSession(authConfig);
  const { user: myself, error } = await getSingleUser(
    session?.user.id!,
    'myself',
    true
  );

  console.log(myself);

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section>
      <UserInfo user={myself} isMyPage />
      <UserBlogposts blogposts={myself?.blogs} owner={myself} />
    </section>
  );
};

export default MyPage;
