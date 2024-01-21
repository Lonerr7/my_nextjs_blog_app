'use client';

import { IUser } from '@/types/userTypes';
import { BlogpostSm } from './BlogpostSm';
import { ISmBlogpost } from '@/types/blogTypes';
import { useOptimistic } from 'react';
import { changeteOptimisitcBlogpost } from '@/utils/changeOptimisitcBlogpost';

interface Props {
  knownOwner?: IUser;
  mySessionId: string;
  noTitle?: boolean;
  blogposts?: ISmBlogpost[];
  blurredUrls: (string | undefined)[] | null;
}

const Blogposts: React.FC<Props> = ({
  knownOwner,
  mySessionId,
  noTitle,
  blogposts,
  blurredUrls,
}) => {
  const [optimisticBlogposts, manipulateOptimisticBlogpost] = useOptimistic(
    blogposts,
    changeteOptimisitcBlogpost
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
                mySessionId={mySessionId}
                key={blogpost._id}
                blogpost={blogpost}
                blurredDataUrl={blurredUrls && blurredUrls[i]}
                owner={knownOwner ? knownOwner : blogpost.owner}
                isMine={
                  knownOwner?._id === mySessionId
                    ? true
                    : mySessionId
                    ? mySessionId === blogpost.owner._id
                    : false
                }
                manipulateOptimisticBlogpost={manipulateOptimisticBlogpost}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default Blogposts;
