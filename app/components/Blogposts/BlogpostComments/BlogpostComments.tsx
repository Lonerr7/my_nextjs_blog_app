'use client';

import { useState } from 'react';
import { FaComment } from 'react-icons/fa';
import PopupContainer from '../../common/PopupContainer';
import BlogpostCommentsContainer from './BlogpostCommentsContainer';
import CommentsLikesBtn from '../../common/CommentsLikesBtn';
import { FaRegComment } from "react-icons/fa";

interface Props {
  blogpostId: string;
  commentsCount: number;
  mySessionId: string;
}

const BlogpostComments: React.FC<Props> = ({
  blogpostId,
  commentsCount,
  mySessionId,
}) => {
  const [isCommentsViewerOpen, setIsCommentsViewerOpen] = useState(false);

  return (
    <div>
      <CommentsLikesBtn
        IconLiked={<FaComment size={22} />}
        IconNotLiked={<FaRegComment size={22} />}
        value={commentsCount}
        onBtnClick={() => {
          setIsCommentsViewerOpen(true);
        }}
      />

      {isCommentsViewerOpen ? (
        <PopupContainer
          customBodyClassName="h-[95vh] w-[75vw] justify-between"
          closePopup={() => setIsCommentsViewerOpen(false)}
        >
          <BlogpostCommentsContainer
            blogpostId={blogpostId}
            mySessionId={mySessionId}
          />
        </PopupContainer>
      ) : null}
    </div>
  );
};

export default BlogpostComments;
