import { authConfig } from '@/configs/auth';
import { getServerSession } from 'next-auth';
import Blogposts from '../components/Blogposts/Blogposts';

const BlogpostsPage = async () => {
  const session = await getServerSession(authConfig);

  return (
    <section>
      <h1 className="page-title">Recent blogposts</h1>

      <Blogposts mySessionId={session?.user.id} />
    </section>
  );
};

export default BlogpostsPage;
