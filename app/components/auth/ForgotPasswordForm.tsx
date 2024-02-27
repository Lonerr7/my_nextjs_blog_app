'use client';

import FormStatelessControl from '../ui/FormStatelessControl';
import { RegisterUserInputFields } from '@/types/userTypes';
import TextBetweenLines from '../ui/TextBetweenLines';
import Link from 'next/link';
import { forgotPassword } from '@/actions/forgotPassword';
import { toast } from 'react-hot-toast';

const ForgotPasswordForm = () => {
  const clientAction = async (formData: FormData) => {
    const { errMessage, successMsg } = await forgotPassword(formData);

    if (errMessage) {
      toast.error(errMessage);
      return;
    }

    if (successMsg) {
      toast.success(successMsg);
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
          placeholder="Enter your email"
        />

        <button className="form-btn" type="submit">
          Send
        </button>
      </form>

      <TextBetweenLines>Or</TextBetweenLines>

      <Link className="form-btn-2" href="/login">
        Log In
      </Link>
    </div>
  );
};

export default ForgotPasswordForm;
