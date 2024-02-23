'use client';

import { IBlogpostLikedUsers } from '@/types/blogTypes';
import LikedUserSm from '../../Users/LikedUserSm';
import { DebouncedState } from 'use-debounce';
import Preloader from '../../common/Preloader';

interface Props {
  likedUsers: IBlogpostLikedUsers;
  mySessionId: string;
  lastLikedUserRef: (node: any) => void;
  initialLoading: boolean;
  handleSearch: DebouncedState<(searchTerm: string) => void>;
}

const BlogpostLikesViewer: React.FC<Props> = ({
  likedUsers,
  mySessionId,
  lastLikedUserRef,
  initialLoading,
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

      {initialLoading ? (
        <Preloader customClassName="absolute right-0 left-0 mx-auto w-[75px]" />
      ) : (
        <ul
          className={`px-4 py-2 flex flex-col items-center  max-h-[330px] ${
            likedUsers.length > 5 && 'overflow-y-scroll'
          }`}
        >
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
      )}
    </div>
  );
};

export default BlogpostLikesViewer;
