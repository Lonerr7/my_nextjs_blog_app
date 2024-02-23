import { IComment } from '@/types/commentTypes';
import React, { FC } from 'react';

interface Props {
  lastLikedCommentRef?: (node: any) => void;
  comment: IComment;
}

const BlogpostComment: FC<Props> = ({ comment, lastLikedCommentRef }) => {
  return <li ref={lastLikedCommentRef}>{comment.text}</li>;
};

export default BlogpostComment;
