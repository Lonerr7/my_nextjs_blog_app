'use client';

import { deleteBlogpost } from '@/actions/deleteBlogpost';
import { toast } from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import AreYouSurePopup from '../common/AreYouSurePopup';
import { useState } from 'react';

interface Props {
  isMine?: boolean;
  blogpostId: string;
  deleteOptimisticBlogpost: (action: unknown) => void;
}

const DeleteBlogpost: React.FC<Props> = ({
  isMine,
  blogpostId,
  deleteOptimisticBlogpost,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const bindedAction = deleteBlogpost.bind(null, blogpostId);
  const clientAction = async () => {
    deleteOptimisticBlogpost(blogpostId);
    const { errMsg, success } = await bindedAction();

    if (errMsg) {
      toast.error(errMsg);
      return;
    }

    // If success
    if (success) {
      toast.success('Sucessfully deleted blogpost!');
    }
  };

  return (
    <>
      {isMine ? (
        isPopupOpen ? (
          <form action={clientAction}>
            <AreYouSurePopup
              popupPhrase="Are you sure you want to delete this blogpost?"
              closePopup={closePopup}
            />
          </form>
        ) : (
          <button type="button" title="Delete Blogpost" onClick={openPopup}>
            <MdDelete
              className="transition delay-30ms text-red-500 hover:text-red-700"
              size={24}
            />
          </button>
        )
      ) : null}
    </>
  );
};

export default DeleteBlogpost;
