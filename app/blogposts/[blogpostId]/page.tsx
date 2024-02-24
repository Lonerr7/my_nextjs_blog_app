import BlogpostBig from '@/app/components/Blogposts/BlogpostBig/BlogpostBig';
import { authConfig } from '@/configs/auth';
import { getSingleBlogpost } from '@/services/blogServices';
import { getServerSession } from 'next-auth';

interface Props {
  params: {
    blogpostId: string;
  };
}

const BlogpostPage: React.FC<Props> = async ({ params: { blogpostId } }) => {
  const session = await getServerSession(authConfig);
  const { blogpost, errMsg } = await getSingleBlogpost(blogpostId);

  if (errMsg) {
    return <p>Error: {errMsg}</p>;
  }

  return (
    <section className="max-w-[800px] mx-auto">
      <BlogpostBig blogpost={blogpost} myId={session?.user.id} />
    </section>
  );
};

export default BlogpostPage;
