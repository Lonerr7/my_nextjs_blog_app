'use client';

import { FC, useState } from 'react';
import FormButton from '../ui/FormButton';
import { changePassword } from '@/actions/changePassword';
import { toast } from 'react-hot-toast';
import FormControl from '../ui/FormControl';
import { ChangePasswordFormState } from '@/types/authTypes';

const ChangePasswordForm: FC = () => {
  const [{ newPassword, newPasswordConfirm, oldPassword }, setFormState] =
    useState<ChangePasswordFormState>({
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    });

  const clientAction = async () => {
    const bindedAction = changePassword.bind(null, {
      newPassword,
      newPasswordConfirm,
      oldPassword,
    });
    const { errMessage, success } = await bindedAction();

    if (errMessage) {
      toast.error(errMessage);
      return;
    }

    if (success) {
      toast.success('Successfully changed password');

      setFormState({
        newPassword: '',
        newPasswordConfirm: '',
        oldPassword: '',
      });
    }
  };

  return (
    <form className="form my-page__form" action={clientAction}>
      <FormControl
        htmlFor="oldPassword"
        labelValue="Old password"
        value={oldPassword}
        type="password"
        setFromState={setFormState}
        stateFieldToChange="oldPassword"
        placeholder="Enter your old password"
        required
      />
      <FormControl
        htmlFor="newPassword"
        labelValue="New password"
        value={newPassword}
        type="password"
        setFromState={setFormState}
        stateFieldToChange="newPassword"
        placeholder="Enter your new password"
        required
      />
      <FormControl
        htmlFor="newPasswordConfirm"
        labelValue="Confirm new password"
        value={newPasswordConfirm}
        type="password"
        setFromState={setFormState}
        stateFieldToChange="newPasswordConfirm"
        placeholder="Confirm your new password"
        required
      />

      <div className="w-full">
        <FormButton btnText="Change password" loadingText="Changing" />
      </div>
    </form>
  );
};

export default ChangePasswordForm;
