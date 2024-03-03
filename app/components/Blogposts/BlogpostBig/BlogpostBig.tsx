import { IBlogPost } from '@/types/blogTypes';
import BlogpostTagBig from '../BlogpostTagBig';
import NextImageVithViewer from '../../Users/NextImageVithViewer';
import Link from 'next/link';
import FormattedDate from '../../common/FormattedDate';
import BlogpostCleanText from '../BlogpostCleanText';
import s from './BlogpostBig.module.css';
import BlogpostControls from '../BlogpostControls';
import BlogpostLikes from '../BlogpostLikes/BlogpostLikes';
import { checkIfLikedByMe } from '@/utils/checkIfLikedByMe';
import BlogpostComments from '../BlogpostComments/BlogpostComments';

interface Props {
  blogpost?: IBlogPost;
  myId?: string;
}

const BlogpostBig: React.FC<Props> = ({ blogpost, myId }) => {
  if (!blogpost) {
    return null;
  }

  const isMeOwner = myId === blogpost?.owner._id;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <BlogpostTagBig customClassName="mr-3 !mb-0" tag={blogpost.tag} />

        {isMeOwner ? (
          <BlogpostControls
            customClassName="w-[70px]"
            blogpostId={blogpost._id}
            withRedirect
            iconSize={24}
            deleteIconSize={30}
          />
        ) : null}
      </div>

      <h1 className="text-4xl font-semibold mb-3">{blogpost.title}</h1>

      <div className="flex items-center mb-5">
        <BlogpostLikes
          customClassName="mr-4"
          blogpostId={blogpost._id}
          blogpostLikesCount={blogpost?.likes?.length}
          isLiked={checkIfLikedByMe(myId!, blogpost?.likes)}
          mySessionId={myId!}
        />
        <BlogpostComments
          blogpostId={blogpost._id}
          mySessionId={myId!}
          commentsCount={blogpost.commentsCount}
        />
      </div>

      <div className="flex items-center justify-between text-text-gray mb-8">
        <Link
          className="flex items-center text-text-gray mr-4"
          href={isMeOwner ? '/my-page' : `/users/${blogpost.owner._id}`}
        >
          <NextImageVithViewer
            customClassName="min-w-[70px] min-h-[70px] mr-3"
            imageUrl={blogpost.owner.image?.imageUrl}
            alt="blogpost's owner avatar"
            sizes="100px"
            small
          />
          <p className="font-medium">{blogpost.owner.username}</p>
        </Link>

        <div className="flex items-center flex-wrap mr-3">
          <p className="mr-2">Created at: </p>
          <FormattedDate
            date={blogpost.createdAt}
            locales="en-EN"
            options={{
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            }}
          />
        </div>
        {blogpost.lastUpdatedAt ? (
          <div className="flex items-center flex-wrap mr-3">
            <p className="mr-2">Last Updated at: </p>
            <FormattedDate
              date={blogpost.lastUpdatedAt}
              locales="en-EN"
              options={{
                month: 'long',
                day: '2-digit',
                year: 'numeric',
              }}
            />
          </div>
        ) : null}
      </div>

      <NextImageVithViewer
        customClassName="!min-h-[462px] mb-8"
        fullscreen
        alt="blogpost_thumbnail"
        imageUrl={blogpost.image.imageUrl}
        sizes="(min-width: 800px) 800px, (min-width: 500px) 500px, 100vw"
      />

      <BlogpostCleanText
        customClassName={`${s.text} dark:!text-white`}
        dirtyText={blogpost.text}
      />
    </div>
  );
};

export default BlogpostBig;
