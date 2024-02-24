'use client';

import { deleteBlogpost } from '@/actions/deleteBlogpost';
import { toast } from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import AreYouSurePopup from '../common/AreYouSurePopup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PopupContainer from '../common/PopupContainer';

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

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
        router.replace('/my-page');
      }
    }
  };

  return (
    <>
      {isPopupOpen ? (
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
