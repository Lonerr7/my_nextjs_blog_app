'use client';

import { likeDislikeBlogpost } from '@/actions/likeDislikeBlogpost';
import { ISmBlogpost } from '@/types/blogTypes';
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';
import LikeDislikePendingBtn from '../LikeDislikePendingBtn';
import { formatLikesCount } from '@/utils/formatLikesCount';
import BlogpostLikesViewer from './BlogpostLikesViewer';
import PopupContainer from '../../common/PopupContainer';

interface Props {
  customClassName?: string;
  isLiked: boolean;
  blogpostLikes: number;
  blogpostId: string;

  manipulateOptimisticBlogpost?: (action: string) => void;
}

const BlogpostLikes: React.FC<Props> = ({
  customClassName,
  isLiked,
  blogpostLikes,
  blogpostId,

  manipulateOptimisticBlogpost,
}) => {
  const [isLikesViewerOpen, setIsLikesViewerOpen] = useState(false);
  const bindedAction = likeDislikeBlogpost.bind(null, blogpostId);

  const clientAction = async () => {
    // if (manipulateOptimisticBlogpost) {
    //   manipulateOptimisticBlogpost(blogpostId);
    // }

    const { errMsg } = await bindedAction();

    if (errMsg) {
      toast.error(errMsg);
    }
  };

  return (
    <div className={`flex items-center ${customClassName}`}>
      <form action={clientAction} className="flex items-center">
        {manipulateOptimisticBlogpost ? (
          <button className="mr-2" type="submit">
            {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </button>
        ) : (
          <LikeDislikePendingBtn isLiked={isLiked} />
        )}
      </form>
      <button
        className="text-lg font-semibold"
        onClick={() => setIsLikesViewerOpen(true)}
      >
        {formatLikesCount(blogpostLikes)}
      </button>
      {isLikesViewerOpen ? (
        <PopupContainer
          customBodyClassName="max-w-[400px] h-[400px] !justify-start p-0"
          customCloseBtnClassName="top-[15px]"
          closePopup={() => setIsLikesViewerOpen(false)}
        >
          <BlogpostLikesViewer blogpostId={blogpostId} />
        </PopupContainer>
      ) : null}
    </div>
  );
};

export default BlogpostLikes;
