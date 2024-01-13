import BlogpostBig from '@/app/components/Blogposts/BlogpostBig';
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
    <section>
      <BlogpostBig blogpost={blogpost} />
    </section>
  );
};

export default BlogpostPage;
