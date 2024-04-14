'use client';

import { deleteBlogpost } from '@/actions/deleteBlogpost';
import { toast } from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import AreYouSurePopup from '../common/AreYouSurePopup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PopupContainer from '../common/PopupContainer';
import { usePopup } from '@/hooks/usePopup';

interface Props {
  blogpostId: string;
  iconSize?: number;
  withRedirect?: boolean;
}

const DeleteBlogpost: React.FC<Props> = ({
  blogpostId,
  iconSize,
  withRedirect,
}) => {
  const { isOpen, openPopup, closePopup } = usePopup();
  const router = useRouter();

  const bindedAction = deleteBlogpost.bind(null, blogpostId);
  const clientAction = async () => {
    const { errMsg, success } = await bindedAction();

    if (errMsg) {
      toast.error(errMsg);
      return;
    }

    // If success
    if (success) {
      toast.success('Sucessfully deleted blogpost!');

      if (withRedirect) {
        router.replace('/');
      }
    }
  };

  return (
    <>
      {isOpen ? (
        <form action={clientAction}>
          <PopupContainer closePopup={closePopup}>
            <AreYouSurePopup popupPhrase="Are you sure you want to delete this blogpost?" />
          </PopupContainer>
        </form>
      ) : (
        <button type="button" title="Delete Blogpost" onClick={openPopup}>
          <MdDelete className="delete-btn" size={iconSize || 24} />
        </button>
      )}
    </>
  );
};

export default DeleteBlogpost;
