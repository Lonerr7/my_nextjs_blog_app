import { IBlogPost } from '@/types/blogTypes';
import { addBlurredDataUrls } from '@/utils/getBase64';
import { IUser } from '@/types/userTypes';
import { BlogpostSm } from './BlogpostSm';

interface Props {
  blogposts: IBlogPost[] | undefined;
  owner?: IUser;
}

const UserBlogposts: React.FC<Props> = async ({ blogposts, owner }) => {
  const blurredUrls = await addBlurredDataUrls(
    blogposts && blogposts.map((blogpost) => blogpost.image.imageUrl)
  );

  return (
    <div>
      <h2 className="text-[24px] font-bold leading-7 mb-8">Latest blogposts</h2>
      <ul className="grid grid-cols-3 gap-5">
        {blogposts
          ? blogposts.map((blogpost, i) => (
              <BlogpostSm
                key={blogpost._id}
                blogpost={blogpost}
                blurredDataUrl={blurredUrls && blurredUrls[i]}
                owner={owner}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default UserBlogposts;
