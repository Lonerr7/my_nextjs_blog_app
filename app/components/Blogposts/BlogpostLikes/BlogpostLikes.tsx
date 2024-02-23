'use client';

import { likeDislikeBlogpost } from '@/actions/likeDislikeBlogpost';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import LikeDislikePendingBtn from '../LikeDislikePendingBtn';
import { formatLikesCount } from '@/utils/formatLikesCount';
import PopupContainer from '../../common/PopupContainer';
import BlogpostLikesViewerContainer from './BlogpostLikesViewerContainer';

interface Props {
  customClassName?: string;
  isLiked: boolean;
  blogpostLikesCount: number;
  blogpostId: string;
  mySessionId: string;
}

const BlogpostLikes: React.FC<Props> = ({
  customClassName,
  isLiked,
  blogpostLikesCount,
  blogpostId,
  mySessionId,
}) => {
  const [isLikesViewerOpen, setIsLikesViewerOpen] = useState(false);
  const bindedAction = likeDislikeBlogpost.bind(null, blogpostId);

  const clientAction = async () => {
    const { errMsg } = await bindedAction();

    if (errMsg) {
      toast.error(errMsg);
    }
  };

  return (
    <div className={`flex items-center ${customClassName}`}>
      <form action={clientAction} className="flex items-center">
        <LikeDislikePendingBtn isLiked={isLiked} />
      </form>
      <button
        className="text-lg font-semibold"
        onClick={() => setIsLikesViewerOpen(true)}
      >
        {formatLikesCount(blogpostLikesCount)}
      </button>

      {isLikesViewerOpen ? (
        <PopupContainer
          customBodyClassName="max-w-[400px] h-[400px] !justify-start p-0"
          customCloseBtnClassName="top-[15px]"
          closePopup={() => setIsLikesViewerOpen(false)}
        >
          <BlogpostLikesViewerContainer
            blogpostId={blogpostId}
            mySessionId={mySessionId}
          />
        </PopupContainer>
      ) : null}
    </div>
  );
};

export default BlogpostLikes;
