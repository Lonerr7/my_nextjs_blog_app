import { Metadata } from 'next';
import { FC } from 'react';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import { getSingleUser } from '@/services/userServices';
import UserInfo from '../components/Users/UserInfo';
import UserBlogposts from '../components/Blogposts/Blogposts';
import { RequestTags } from '@/types/requestTypes';

export const metadata: Metadata = {
  title: 'My Page | Meta Blog',
};

const MyPage: FC = async () => {
  const session = await getServerSession(authConfig);
  const { user: myself, error } = await getSingleUser(
    session?.user.id!,
    RequestTags.GET_ME,
    false
  );

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
      <UserBlogposts myselfOwner={myself} />
    </section>
  );
};

export default MyPage;
