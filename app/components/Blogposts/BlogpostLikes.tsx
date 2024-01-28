'use client';

import { likeDislikeBlogpost } from '@/actions/likeDislikeBlogpost';
import { ISmBlogpost } from '@/types/blogTypes';
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';
import LikeDislikePendingBtn from './LikeDislikePendingBtn';
import { formatLikesCount } from '@/utils/formatLikesCount';

interface Props {
  customClassName?: string;
  isLiked: boolean;
  blogpostLikes: ISmBlogpost['likes'];
  blogpostId: string;
  userId: string;
  manipulateOptimisticBlogpost?: (action: {
    userId?: string;
    blogpostId?: string;
  }) => void;
}

const BlogpostLikes: React.FC<Props> = ({
  customClassName,
  isLiked,
  blogpostLikes,
  blogpostId,
  userId,
  manipulateOptimisticBlogpost,
}) => {
  const bindedAction = likeDislikeBlogpost.bind(null, {
    blogpostId,
    userId,
  });

  const clientAction = async () => {
    if (manipulateOptimisticBlogpost) {
      manipulateOptimisticBlogpost({ blogpostId, userId });
    }

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
      <p className="text-lg font-semibold">
        {blogpostLikes
          ? formatLikesCount(Object.keys(blogpostLikes).length)
          : 0}
      </p>
    </div>
  );
};

export default BlogpostLikes;
