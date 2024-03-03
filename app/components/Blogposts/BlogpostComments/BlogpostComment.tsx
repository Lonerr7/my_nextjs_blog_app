import { IComment } from '@/types/commentTypes';
import React, { FC } from 'react';
import NextImageVithViewer from '../../Users/NextImageVithViewer';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import CommentsLikesBtn from '../../common/CommentsLikesBtn';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import FormattedDate from '../../common/FormattedDate';
import { checkIfLikedByMe } from '@/utils/checkIfLikedByMe';

interface Props {
  lastLikedCommentRef?: (node: any) => void;
  comment: IComment;
  isMine: boolean;
  myId: string;
  deleteComment: () => Promise<void>;
  likeDislikeComment: () => Promise<void>;
}

const BlogpostComment: FC<Props> = ({
  comment,
  lastLikedCommentRef,
  isMine,
  myId,
  deleteComment,
  likeDislikeComment,
}) => {
  const isLiked = checkIfLikedByMe(myId, Object?.keys(comment.likes));

  return (
    <li
      className="w-full mb-6 last:mb-0 flex pb-3 border-b border-solid border-[#6c6c6c]"
      ref={lastLikedCommentRef}
    >
      <Link
        className="inline-block mr-3"
        href={isMine ? '/my-page' : `/users/${comment.owner._id}`}
      >
        <NextImageVithViewer
          customClassName="!min-w-[50px] !min-h-[50px] max-w-[50px] max-h-[50px]"
          imageUrl={comment.owner.image?.imageUrl}
          alt="avatar"
          small
          sizes="100px"
        />
      </Link>

      <div className="w-full flex justify-between items-start">
        <div className="mr-2">
          <div className="flex mb-2">
            <Link
              className="inline-block font-semibold mr-2 dark:text-white"
              href={isMine ? '/my-page' : `/users/${comment.owner._id}`}
            >
              {comment.owner.username}
            </Link>
            <FormattedDate
              customClassName="text-text-gray text-sm"
              date={comment.createdAt}
              locales="ru-RU"
              options={{
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }}
            />
          </div>
          <p className="mb-4 dark:text-comment-text">{comment.text}</p>

          <form action={likeDislikeComment}>
            <CommentsLikesBtn
              customCounterClassName="text-[8px] !w-[16px] !h-[16px] top-[-5px] left-[8px] rounded-3xl"
              customNumberClassName="!mb-0"
              IconLiked={<FaHeart size={14} />}
              IconNotLiked={<FaRegHeart size={14} />}
              isLiked={isLiked}
              value={Object.keys(comment.likes).length}
              onBtnClick={() => {}}
              btnType="submit"
            />
          </form>
        </div>

        {isMine ? (
          <form action={deleteComment}>
            <button className="delete-btn" type="submit">
              <MdDelete size={20} />
            </button>
          </form>
        ) : null}
      </div>
    </li>
  );
};

export default BlogpostComment;
