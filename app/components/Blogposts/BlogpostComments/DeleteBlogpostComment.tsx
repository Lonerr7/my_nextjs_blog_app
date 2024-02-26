'use client';

import { deleteComment } from '@/actions/deleteComment';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

interface Props {
  commentId: string;
  blogpostId: string;
  setScrollState: Dispatch<any>;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setIsItemOnFirstPageDeleted: Dispatch<SetStateAction<boolean>>;
}

const DeleteBlogpostComment: FC<Props> = ({
  commentId,
  blogpostId,
  setPageNumber,
  setScrollState,
  setIsItemOnFirstPageDeleted,
}) => {
  const clientAction = async () => {
    const bindndedAction = deleteComment.bind(null, { commentId, blogpostId });

    const { errMessage } = await bindndedAction();

    if (errMessage) {
      toast.error(errMessage);
      return;
    }

    toast.success('Comment was successfully deleted');
    setPageNumber(1);
    setScrollState([]);
    setIsItemOnFirstPageDeleted(true);
  };

  return (
    <form action={clientAction}>
      <button className="delete-btn">
        <MdDelete size={20} />
      </button>
    </form>
  );
};

export default DeleteBlogpostComment;
