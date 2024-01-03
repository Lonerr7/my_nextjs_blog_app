import { IBlogPost } from '@/types/blogTypes';
import NextImageVithViewer from '../NextImageVithViewer';
import BlogpostTag from './BlogpostTag';
import { addBlurredDataUrls } from '@/utils/getBase64';
import { IUser } from '@/types/userTypes';
import Link from 'next/link';

const BlogpostSm = ({
  blogpost,
  blurredDataUrl,
  owner,
}: {
  blogpost: IBlogPost;
  blurredDataUrl: any;
  owner?: IUser;
}) => {
  return (
    <li className="p-4 border rounded-xl border-solid border-blogpost-border-light">
      <Link
        className="h-[500px] flex flex-col justify-between"
        href={`/blogs/${blogpost._id}`}
      >
        <div>
          <NextImageVithViewer
            imageUrl={blogpost.image.imageUrl}
            customClassName="mb-6 !max-w-[360px] min-h-[240px] mx-auto "
            customImgClassName="border rounded-md border-transparent"
            sizes="90wv"
            blurDataUrl={blurredDataUrl}
          />
          <BlogpostTag tag={blogpost.tag} />
          <h2 className="text-2xl leading-7 font-semibold mb-5">
            {blogpost.title}
          </h2>
        </div>
        <div className="flex items-center">
          <Link
            className="flex items-center mr-5"
            href={`/users/${owner?._id}`}
          >
            <NextImageVithViewer
              customClassName="!max-w-[36px] !max-h-[36px] min-w-[36px] min-h-[36px] mr-3"
              imageUrl={owner?.image?.imageUrl}
              sizes="36px"
              small
            />
            <p className="text-blogpost-info">{owner?.username}</p>
          </Link>
          <p className="text-blogpost-info">
            {new Date(blogpost.createdAt).toLocaleDateString('en-EN', {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            })}
          </p>
        </div>
      </Link>
    </li>
  );
};

interface Props {
  blogposts: IBlogPost[] | undefined;
  owner?: IUser;
}

const UserBlogposts: React.FC<Props> = async ({ blogposts, owner }) => {
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
                owner={owner}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default UserBlogposts;
