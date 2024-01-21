'use client';

import { likeDislikeBlogpost } from '@/actions/likeDislikeBlogpost';
import { ISmBlogpost } from '@/types/blogTypes';
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

interface Props {
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

    const { errMsg, success } = await bindedAction();
    console.log(errMsg);
  };

  return (
    <div className="flex items-center">
      <form action={clientAction} className="flex items-center">
        <button className="mr-2" type="submit">
          {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
        </button>
      </form>
      <p className="text-lg font-semibold">
        {blogpostLikes ? Object.keys(blogpostLikes).length : 0}
      </p>
    </div>
  );
};

export default BlogpostLikes;
