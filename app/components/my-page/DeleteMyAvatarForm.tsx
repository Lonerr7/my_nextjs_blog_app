'use client';

import { deleteMyProfilePicture } from '@/actions/deleteMyProfilePic';
import FormButton from '../ui/FormButton';
import { toast } from 'react-hot-toast';

const DeleteMyAvatarForm = () => {
  const clientAction = async () => {
    const response = await deleteMyProfilePicture();

    if (response?.errMessage) {
      toast.error(response.errMessage);
      return;
    }

    toast.success('Successfuly deleted!');
  };

  return (
    <form className="w-1/2" action={clientAction}>
      <FormButton
        customClassName="mr-4 !bg-red-600 disabled:!bg-red-300"
        btnText="Delete my avatar"
        loadingText="Deleting"
      />
    </form>
  );
};

export default DeleteMyAvatarForm;
