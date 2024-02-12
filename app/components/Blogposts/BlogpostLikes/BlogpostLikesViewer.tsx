'use client';

import { IBlogpostLikedUsers } from '@/types/blogTypes';
import LikedUserSm from '../../Users/LikedUserSm';

interface Props {
  likedUsers: IBlogpostLikedUsers;
  mySessionId: string;
}

const BlogpostLikesViewer: React.FC<Props> = ({ likedUsers, mySessionId }) => {
  console.log(likedUsers[0]);

  return (
    <div className="w-full">
      <h4 className="font-semibold py-4 w-full block border-b border-solid border-item-gray text-center">
        Likes
      </h4>
      <ul className="px-4 py-2 flex flex-col items-center">
        {likedUsers?.map((user) => (
          <LikedUserSm
            key={user._id}
            user={user}
            isMe={user?._id === mySessionId}
          />
        ))}
      </ul>
    </div>
  );
};

export default BlogpostLikesViewer;
