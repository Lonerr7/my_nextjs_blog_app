'use client';

import { deleteMyProfilePicture } from '@/actions/deleteMyProfilePic';
import { toast } from 'react-hot-toast';
import AreYouSurePopup from '../common/AreYouSurePopup';
import PopupContainer from '../common/PopupContainer';
import { usePopup } from '@/hooks/usePopup';

const DeleteMyAvatarForm = () => {
  const { isOpen: isPopupOpen, openPopup, closePopup } = usePopup();

  const clientAction = async () => {
    const response = await deleteMyProfilePicture();

    if (response?.errMessage) {
      toast.error(response.errMessage);
      closePopup();
      return;
    }

    toast.success('Successfuly deleted!');
    closePopup();
  };

  return (
    <>
      <form className="w-1/2" action={clientAction}>
        {isPopupOpen ? (
          <PopupContainer closePopup={closePopup} withoutPortal>
            <AreYouSurePopup popupPhrase="delete your profile picture" />
          </PopupContainer>
        ) : null}
      </form>
      <button
        className="form-btn !w-1/2 !bg-red-600 disabled:!bg-red-300"
        onClick={openPopup}
      >
        Delete my profile picture
      </button>
    </>
  );
};

export default DeleteMyAvatarForm;
