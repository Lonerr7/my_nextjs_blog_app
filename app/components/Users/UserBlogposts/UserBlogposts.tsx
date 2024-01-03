import { IBlogPost } from '@/types/blogTypes';
import NextImageVithViewer from '../NextImageVithViewer';
import BlogpostTag from './BlogpostTag';
import { addBlurredDataUrls } from '@/utils/getBase64';

interface Props {
  blogposts: IBlogPost[] | undefined;
}

const BlogpostSm = ({
  blogpost,
  blurredDataUrl,
}: {
  blogpost: IBlogPost;
  blurredDataUrl: any;
}) => {
  console.log(blurredDataUrl);

  return (
    <li className="p-4 border rounded-xl border-solid border-blogpost-border-light">
      <NextImageVithViewer
        avatarURL={blogpost.image.imageUrl}
        fullscreen
        customClassName="mb-6 !max-w-[360px] min-h-[240px] mx-auto "
        customImgClassName="border rounded-md border-transparent"
        sizes="90wv"
        blurDataUrl={blurredDataUrl}
      />
      <BlogpostTag tag={blogpost.tag} />
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
  const blurredUrls = await addBlurredDataUrls(
    blogposts?.map((blogpost) => blogpost.image.imageUrl)
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
                blurredDataUrl={blurredUrls[i]}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default UserBlogposts;
