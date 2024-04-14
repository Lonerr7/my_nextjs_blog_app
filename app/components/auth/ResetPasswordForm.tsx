'use client';

import { FC } from 'react';
import FormButton from '../ui/FormButton';
import FormStatelessControl from '../ui/FormStatelessControl';
import { RegisterUserInputFields } from '@/types/userTypes';
import { resetPassword } from '@/actions/resetPassword';
import { toast } from 'react-hot-toast';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface Props {
  userId: string;
  router: AppRouterInstance;
}

const ResetPasswordForm: FC<Props> = ({ userId, router }) => {
  const clientAction = async (formData: FormData) => {
    const bindedAction = resetPassword.bind(null, userId);

    const { success, errMessage } = await bindedAction(formData);

    if (errMessage) {
      toast.error(errMessage);
      return;
    }

    if (success) {
      toast.success('Successfully updated your password!');
      router.replace('/login');
    }
  };

  return (
    <div className="form">
      <form action={clientAction}>
        <FormStatelessControl
          defaultvalue=""
          labelValue="Password"
          htmlFor={RegisterUserInputFields.PASSWORD}
          required
          type='password'
          placeholder="Enter your new password"
        />
        <FormStatelessControl
          defaultvalue=""
          labelValue="Password Confirm"
          htmlFor={RegisterUserInputFields.PASSWORD_CONFIRM}
          required
          type='password'
          placeholder="Confirm your new password"
        />

        <FormButton btnText="Reset" loadingText="Resetting" />
      </form>
    </div>
  );
};

export default ResetPasswordForm;
