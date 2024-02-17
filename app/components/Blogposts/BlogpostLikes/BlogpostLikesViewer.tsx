'use client';

import { IBlogpostLikedUsers } from '@/types/blogTypes';
import LikedUserSm from '../../Users/LikedUserSm';
import { DebouncedState } from 'use-debounce';

interface Props {
  likedUsers: IBlogpostLikedUsers;
  mySessionId: string;
  lastLikedUserRef: (node: any) => void;
  handleSearch: DebouncedState<(searchTerm: string) => void>;
}

const BlogpostLikesViewer: React.FC<Props> = ({
  likedUsers,
  mySessionId,
  lastLikedUserRef,
  handleSearch,
}) => {
  return (
    <div className="w-full">
      <h4 className="font-semibold py-4 w-full block border-b border-solid border-item-gray text-center">
        Likes
      </h4>

      <input
        className="search-input px-3 py-2 my-4 text-sm"
        placeholder="Search by user's nickname..."
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />

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
