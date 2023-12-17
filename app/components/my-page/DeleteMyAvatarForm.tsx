'use client';

import { deleteMyProfilePicture } from '@/actions/deleteMyProfilePic';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import AreYouSurePopup from '../common/AreYouSurePopup';

const DeleteMyAvatarForm = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

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
          <AreYouSurePopup
            popupPhrase="delete your profile picture"
            closePopup={closePopup}
          />
        ) : null}
      </form>
      <button
        className="form-btn !w-1/2 !bg-red-600 disabled:!bg-red-300"
        onClick={() => {
          setIsPopupOpen(true);
        }}
      >
        Delete my profile picture
      </button>
    </>
  );
};

export default DeleteMyAvatarForm;
