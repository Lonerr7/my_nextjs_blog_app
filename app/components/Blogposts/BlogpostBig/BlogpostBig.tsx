import { IBlogPost } from '@/types/blogTypes';
import BlogpostTagBig from '../BlogpostTagBig';
import NextImageVithViewer from '../../Users/NextImageVithViewer';
import Link from 'next/link';
import BlogpostDate from '../BlogpostDate';
import BlogpostCleanText from '../BlogpostCleanText';
import s from './BlogpostBig.module.css';
import { LuPencil } from 'react-icons/lu';
import BlogpostControls from '../BlogpostControls';

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
          // <Link
          //   className="inline-block"
          //   href={`/blogposts/${blogpost._id}/edit`}
          //   title="Edit blogpost"
          // >
          //   <LuPencil className="dark:text-light-gray" size={24} />
          // </Link>
          <BlogpostControls
            customClassName="w-[70px]"
            blogpostId={blogpost._id}
            withRedirect
            iconSize={24}
            deleteIconSize={30}
          />
        ) : null}
      </div>
      <h1 className="text-4xl font-semibold mb-5">{blogpost.title}</h1>

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
          <BlogpostDate
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
            <BlogpostDate
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
