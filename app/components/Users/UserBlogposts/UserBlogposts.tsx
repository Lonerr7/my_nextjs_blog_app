import { IBlogPost } from '@/types/blogTypes';

interface Props {
  blogposts: IBlogPost[] | undefined;
}

const BlogpostSm = ({ blogpost }: { blogpost: IBlogPost }) => {
  return (
    <li>
      <p>post img</p>
      <p>TAG</p>
      <h2>TITLE</h2>
      <div>
        <div>
          <p>user avatar</p>
          <p>username</p>
        </div>
        <p>date</p>
      </div>
    </li>
  );
};

const UserBlogposts: React.FC<Props> = async ({ blogposts }) => {
  return (
    <ul>
      {blogposts
        ? blogposts.map((blogpost) => (
            <BlogpostSm key={blogpost._id} blogpost={blogpost} />
          ))
        : null}
    </ul>
  );
};

export default UserBlogposts;
