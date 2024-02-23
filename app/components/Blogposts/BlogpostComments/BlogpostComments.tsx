'use client';

import { formatLikesCount } from '@/utils/formatLikesCount';
import { useState } from 'react';
import { FaComment } from 'react-icons/fa';
import PopupContainer from '../../common/PopupContainer';
import BlogpostCommentsContainer from './BlogpostCommentsContainer';

interface Props {
  blogpostId: string;
  commentsCount: number;
}

const BlogpostComments: React.FC<Props> = ({ blogpostId, commentsCount }) => {
  const [isCommentsViewerOpen, setIsCommentsViewerOpen] = useState(false);

  return (
    <div>
      <button
        className="text-lg font-semibold relative"
        onClick={() => setIsCommentsViewerOpen(true)}
      >
        <FaComment size={22} />
        <span className="absolute top-[-7px] left-[13px] h-[18px] text-[10px] rounded-xl w-[18px] flex flex-col justify-center bg-rose-500 text-white">
          <span className="mb-[1px]">{formatLikesCount(commentsCount)}</span>
        </span>
      </button>

      {isCommentsViewerOpen ? (
        <PopupContainer
          customBodyClassName="h-[95vh] w-[50vw] justify-between"
          closePopup={() => setIsCommentsViewerOpen(false)}
        >
          <BlogpostCommentsContainer blogpostId={blogpostId} />
        </PopupContainer>
      ) : null}
    </div>
  );
};

export default BlogpostComments;
