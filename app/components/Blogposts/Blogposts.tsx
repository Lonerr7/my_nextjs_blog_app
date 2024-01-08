'use client';

import { IUser } from '@/types/userTypes';
import { BlogpostSm } from './BlogpostSm';
import { IBlogPost } from '@/types/blogTypes';
import { useOptimistic } from 'react';

interface Props {
  knownOwner?: IUser;
  mySessionId?: string;
  noTitle?: boolean;
  blogposts?: IBlogPost[];
  blurredUrls: (string | undefined)[] | null;
}

const Blogposts: React.FC<Props> = ({
  knownOwner,
  mySessionId,
  noTitle,
  blogposts,
  blurredUrls,
}) => {
  const [optimisticBlogposts, deleteOptimisticBlogpost] = useOptimistic(
    blogposts,
    (state, optimisticValue) => {
      return state?.filter((todo) => todo._id !== optimisticValue);
    }
  );

  return (
    <div>
      {noTitle || (
        <h2 className="text-[24px] font-bold leading-7 mb-8">
          Latest blogposts
        </h2>
      )}
      <ul className="grid grid-cols-3 gap-5">
        {optimisticBlogposts
          ? optimisticBlogposts.map((blogpost, i) => (
              <BlogpostSm
                key={blogpost._id}
                blogpost={blogpost}
                blurredDataUrl={blurredUrls && blurredUrls[i]}
                owner={knownOwner ? knownOwner : blogpost.owner}
                isMine={
                  knownOwner?._id === mySessionId
                    ? true
                    : mySessionId === blogpost.owner._id
                }
                deleteOptimisticBlogpost={deleteOptimisticBlogpost}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default Blogposts;
