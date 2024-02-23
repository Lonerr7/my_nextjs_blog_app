import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getBlogpostComments } from '@/services/blogServices';
import { IComment } from '@/types/commentTypes';
import React, { FC, useRef, useState } from 'react';
import { DebouncedState } from 'use-debounce';
import Preloader from '../../common/Preloader';
import BlogpostComment from './BlogpostComment';

interface Props {
  comments: IComment[];
  mySessionId: string;
  lastLikedCommentRef: (node: any) => void;
  initialLoading: boolean;
  handleSearch: DebouncedState<(searchTerm: string) => void>;
}

const BlogpostCommentsViewer: FC<Props> = ({
  lastLikedCommentRef,
  initialLoading,
  comments,
  handleSearch,
  mySessionId,
}) => {
  return (
    <div className="w-full">
      <h4 className="font-semibold py-4 w-full block border-b border-solid border-item-gray text-center">
        Comments
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
            comments.length > 5 && 'overflow-y-scroll'
          }`}
        >
          {comments?.map((comment, i) => {
            if (comments.length === i + 1) {
              return (
                <BlogpostComment
                  key={comment._id}
                  comment={comment}
                  lastLikedCommentRef={lastLikedCommentRef}
                />
              );
            }

            return <BlogpostComment key={comment._id} comment={comment} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default BlogpostCommentsViewer;
