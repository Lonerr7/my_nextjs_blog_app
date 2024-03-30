'use client';

import FormStatelessControl from '../ui/FormStatelessControl';
import { RegisterUserInputFields } from '@/types/userTypes';
import TextBetweenLines from '../ui/TextBetweenLines';
import Link from 'next/link';
import { forgotPassword } from '@/actions/forgotPassword';
import { toast } from 'react-hot-toast';
import FormButton from '../ui/FormButton';

const ForgotPasswordForm = () => {
  const clientAction = async (formData: FormData) => {
    const { errMessage, successMsg } = await forgotPassword(formData);

    if (errMessage) {
      toast.error(errMessage);
      return;
    }

    if (successMsg) {
      toast.success(successMsg, {
        duration: 4000,
      });
    }
  };

  return (
    <div className="form">
      <form action={clientAction}>
        <FormStatelessControl
          defaultvalue=""
          labelValue="Email"
          htmlFor={RegisterUserInputFields.EMAIL}
          required
          type='email'
          placeholder="Enter your email"
        />

        <FormButton btnText="Send" loadingText="Sendning" />
      </form>

      <TextBetweenLines>Or</TextBetweenLines>

      <Link className="form-btn-2 mb-4" href="/login">
        Log In
      </Link>
      <Link className="form-btn mb-4" href="/">
        Sign Up
      </Link>
    </div>
  );
};

export default ForgotPasswordForm;
