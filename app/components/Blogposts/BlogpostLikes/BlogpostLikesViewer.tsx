'use client';

import { IBlogpostLikedUsers } from '@/types/blogTypes';
import LikedUserSm from '../../Users/LikedUserSm';

interface Props {
  likedUsers: IBlogpostLikedUsers;
  mySessionId: string;
  lastLikedUserRef: (node: any) => void;
}

const BlogpostLikesViewer: React.FC<Props> = ({
  likedUsers,
  mySessionId,
  lastLikedUserRef,
}) => {
  return (
    <div className="w-full">
      <h4 className="font-semibold py-4 w-full block border-b border-solid border-item-gray text-center">
        Likes
      </h4>
      <ul className="px-4 py-2 flex flex-col items-center overflow-y-scroll max-h-[330px]">
        {likedUsers?.map((user, i) => {
          if (likedUsers.length === i + 1) {
            return (
              <LikedUserSm
                key={user._id}
                user={user}
                isMe={user?._id === mySessionId}
                lastLikedUserRef={lastLikedUserRef}
              />
            );
          }

          return (
            <LikedUserSm
              key={user._id}
              user={user}
              isMe={user?._id === mySessionId}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default BlogpostLikesViewer;
