import { ISmBlogpost } from '@/types/blogTypes';
import { IUser } from '@/types/userTypes';
import Link from 'next/link';
import NextImageVithViewer from '../Users/NextImageVithViewer';
import BlogpostTagSm from './BlogpostTagSm';
import { cropStringByLength } from '@/utils/cropStringByLength';
import BlogpostControls from './BlogpostControls';
import FormattedDate from '../common/FormattedDate';
import BlogpostLikes from './BlogpostLikes/BlogpostLikes';
import BlogpostComments from './BlogpostComments/BlogpostComments';
import { checkIfLikedByMe } from '@/utils/checkIfLikedByMe';

export const BlogpostSm = ({
  blogpost,
  blurredDataUrl,
  owner,
  isMine,
  mySessionId,
}: {
  blogpost: ISmBlogpost; //! не понятно по типам где будет подтягиваться овнер, а где нет
  blurredDataUrl: any;
  owner: IUser;
  isMine: boolean;
  mySessionId: string;
}) => {
  const isLiked = checkIfLikedByMe(mySessionId, blogpost?.likes);

  return (
    <li className="p-4 border rounded-xl border-solid border-blogpost-border-light h-[500px] flex flex-col justify-between hover:bg-light-gray dark:hover:bg-item-bg-dark_x2_hover xsm:!h-[420px]">
      <Link
        className="h-[450px] xsm:!h-[360px]"
        href={`/blogposts/${blogpost._id}`}
      >
        <div>
          <NextImageVithViewer
            imageUrl={blogpost.image.imageUrl}
            customClassName="mb-6 !max-w-[360px] h-[240px] mx-auto xsm:!max-w-[510px] xsm:!h-[180px]"
            customImgClassName="border rounded-md border-transparent"
            sizes="400px"
            alt="blogpost_thumbnail"
            blurDataUrl={blurredDataUrl}
          />

          <BlogpostTagSm tag={blogpost.tag} />

          <h2 className="text-2xl leading-7 font-semibold mb-5 dark:text-white xsm:!text-xl">
            {cropStringByLength(blogpost.title, 70, true)}
          </h2>
        </div>
      </Link>
      <div className="flex items-center justify-between md:flex-col xsm:flex-row xxsm:flex-col">
        <div className="flex items-center mr-1 md:mb-2 xsm:mb-0 xxsm:mb-3">
          <Link
            className="flex items-center mr-5"
            href={isMine ? `/` : `/users/${owner._id}`}
          >
            <NextImageVithViewer
              customClassName="!max-w-[36px] !max-h-[36px] min-w-[36px] min-h-[36px] mr-3"
              imageUrl={owner?.image?.imageUrl}
              sizes="36px"
              small
              alt="blogpost owner's avatar"
            />
            <p className="text-blogpost-info">{owner?.username}</p>
          </Link>

          <FormattedDate
            date={blogpost.createdAt}
            customClassName="text-blogpost-info"
            locales="en-EN"
            options={{
              month: 'numeric',
              day: '2-digit',
              year: '2-digit',
            }}
          />
        </div>

        <div className="flex justify-between items-center grow">
          <div className="flex items-center md:mr-3">
            <BlogpostLikes
              customClassName="mr-3"
              blogpostLikesCount={blogpost?.likes?.length}
              isLiked={isLiked}
              blogpostId={blogpost._id}
              mySessionId={mySessionId}
            />
            <BlogpostComments
              blogpostId={blogpost._id}
              commentsCount={blogpost.commentsCount}
              mySessionId={mySessionId}
            />
          </div>

          {/* Blogpost controls if it's mine */}
          {isMine ? (
            <BlogpostControls blogpostId={blogpost._id} withoutDelete />
          ) : null}
        </div>
      </div>
    </li>
  );
};
