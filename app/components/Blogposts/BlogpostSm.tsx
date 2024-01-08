import { IBlogPost } from '@/types/blogTypes';
import { IUser } from '@/types/userTypes';
import Link from 'next/link';
import NextImageVithViewer from '../Users/NextImageVithViewer';
import BlogpostTagSm from './BlogpostTagSm';
import { cropStringByLength } from '@/utils/cropStringByLength';
import DeleteBlogpost from './DeleteBlogpost';

export const BlogpostSm = ({
  blogpost,
  blurredDataUrl,
  owner,
  isMine,
  deleteOptimisticBlogpost,
}: {
  blogpost: IBlogPost;
  blurredDataUrl: any;
  owner: IUser;
  isMine: boolean;
  deleteOptimisticBlogpost: (action: unknown) => void;
}) => {
  return (
    <li className="p-4 border rounded-xl border-solid border-blogpost-border-light h-[500px] flex flex-col justify-between hover:bg-light-gray dark:hover:bg-item-bg-dark_x2_hover">
      <Link className="h-[450px]" href={`/blogs/${blogpost._id}`}>
        <div>
          <NextImageVithViewer
            imageUrl={blogpost.image.imageUrl}
            customClassName="mb-6 !max-w-[360px] min-h-[240px] mx-auto "
            customImgClassName="border rounded-md border-transparent"
            sizes="90wv"
            blurDataUrl={blurredDataUrl}
          />

          <BlogpostTagSm tag={blogpost.tag} />

          <h2 className="text-2xl leading-7 font-semibold mb-5 dark:text-white">
            {cropStringByLength(blogpost.title, 70, true)}
          </h2>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex items-center mr-1">
          <Link
            className="flex items-center mr-5"
            href={isMine ? `/my-page` : `/users/${owner._id}`}
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

        <DeleteBlogpost
          blogpostId={blogpost._id}
          isMine={isMine}
          deleteOptimisticBlogpost={deleteOptimisticBlogpost}
        />
      </div>
    </li>
  );
};
