'use client';

import { useState } from 'react';
import PopupContainer from '../../common/PopupContainer';
import BlogpostCommentsContainer from './BlogpostCommentsContainer';
import CommentsLikesBtn from '../../common/CommentsLikesBtn';
import { FaRegComment } from 'react-icons/fa';

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
        IconNotLiked={
          <FaRegComment className="w-[22px] h-[22px] xsm:!w-[18px] xsm:!h-[18px]" />
        }
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
