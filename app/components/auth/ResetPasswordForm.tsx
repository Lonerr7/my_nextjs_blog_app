'use client';

import { FC } from 'react';
import FormButton from '../ui/FormButton';
import FormStatelessControl from '../ui/FormStatelessControl';
import { RegisterUserInputFields } from '@/types/userTypes';


const ResetPasswordForm: FC = () => {
  return (
    <div className="form">
      <form>
        <FormStatelessControl
          defaultvalue=""
          labelValue="Password"
          htmlFor={RegisterUserInputFields.PASSWORD}
          required
          placeholder="Enter your new password"
        />
        <FormStatelessControl
          defaultvalue=""
          labelValue="Password Confirm"
          htmlFor={RegisterUserInputFields.PASSWORD_CONFIRM}
          required
          placeholder="Confirm your new password"
        />

        <FormButton
          btnText="Reset"
          loadingText="Resetting"
        />
      </form>
    </div>
  );
};

export default ResetPasswordForm;
