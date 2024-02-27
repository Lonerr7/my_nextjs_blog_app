'use client';

import { IComment } from '@/types/commentTypes';
import { Dispatch, FC, SetStateAction } from 'react';
import Preloader from '../../common/Preloader';
import BlogpostComment from './BlogpostComment';
import { deleteComment } from '@/actions/deleteComment';
import { refetchComments } from '@/utils/refetchComments';
import { likeDislikeComment } from '@/actions/likeDislikeComment';

interface Props {
  comments: IComment[];
  mySessionId: string;
  lastLikedCommentRef: (node: any) => void;
  initialLoading: boolean;
  pageNumber: number;
  blogpostId: string;
  setScrollState: Dispatch<any>;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

const BlogpostCommentsViewer: FC<Props> = ({
  lastLikedCommentRef,
  initialLoading,
  comments,
  mySessionId,
  pageNumber,
  blogpostId,
  setScrollState,
  setPageNumber,
}) => {
  const deleteCommentHandler =
    (commentId: string, blogpostId: string) => async () => {
      const bindedAction = deleteComment.bind(null, {
        blogpostId,
        commentId,
      });

      const { errMessage } = await bindedAction();

      refetchComments({
        blogpostId,
        errMessage,
        pageNumber,
        successMessage: 'Successfully deleted a comment!',
        setPageNumber,
        setScrollState,
      });
    };

  const likedDislikeCommentHandler = (commentId: string) => async () => {
    const bindedAction = likeDislikeComment.bind(null, commentId);

    const { errMessage } = await bindedAction();

    refetchComments({
      blogpostId,
      errMessage,
      pageNumber,
      successMessage: 'Success!',
      setPageNumber,
      setScrollState,
    });
  };

  return (
    <div className="w-full">
      <h4 className="font-semibold mb-6 py-4 w-full block border-b border-solid border-item-gray text-center">
        Comments
      </h4>

      {initialLoading ? (
        <Preloader customClassName="absolute right-0 left-0 mx-auto w-[75px]" />
      ) : (
        <ul
          className={`px-4 py-2 max-h-[485px] ${
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
                  isMine={mySessionId === comment.owner?._id}
                  deleteComment={deleteCommentHandler(comment._id, blogpostId)}
                  likeDislikeComment={likedDislikeCommentHandler(comment._id)}
                  myId={mySessionId}
                />
              );
            }

            return (
              <BlogpostComment
                key={comment._id}
                comment={comment}
                isMine={mySessionId === comment.owner?._id}
                deleteComment={deleteCommentHandler(comment._id, blogpostId)}
                likeDislikeComment={likedDislikeCommentHandler(comment._id)}
                myId={mySessionId}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BlogpostCommentsViewer;
