'use client';

import { usePopup } from '@/hooks/usePopup';
import PopupContainer from '../common/PopupContainer';
import AreYouSurePopup from '../common/AreYouSurePopup';
import { deleteMyProfile } from '@/actions/deleteMyProfile';
import { toast } from 'react-hot-toast';
import { signOut } from 'next-auth/react';

const DeleteMyProfileForm = () => {
  const { isOpen, openPopup, closePopup } = usePopup();

  const clientAction = async () => {
    const { errMessage, success } = await deleteMyProfile();

    if (errMessage) {
      toast.error(errMessage);
      return;
    }

    if (success) {
      signOut();
    }
  };

  return (
    <div>
      <form action={clientAction}>
        {isOpen ? (
          <PopupContainer closePopup={closePopup} withoutPortal>
            <AreYouSurePopup popupPhrase="delete your profile? Your profile will be deleted forever!" />
          </PopupContainer>
        ) : null}
      </form>
      <button
        className="form-btn !w-[200px] !bg-red-600 hover:!bg-red-700"
        onClick={openPopup}
      >
        Delete Profile
      </button>
    </div>
  );
};

export default DeleteMyProfileForm;
