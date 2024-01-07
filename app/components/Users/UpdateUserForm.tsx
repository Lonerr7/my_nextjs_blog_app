'use client';

import { IUser } from '@/types/userTypes';
import { FC } from 'react';
import { updateMyInfo } from '@/actions/updateMyInfo';
import toast from 'react-hot-toast';

interface Props {
  user: IUser;
}

const UpdateUserForm: FC<Props> = ({ user }) => {
  const clientAction = async (formData: FormData) => {
    const error = await updateMyInfo(formData);

    if (error?.message) {
      toast.error(error.message);
    }
  };

  return (
    <form action={clientAction}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        defaultValue={user.username}
      />
      <button type="submit">Change Username</button>
    </form>
  );
};

export default UpdateUserForm;
