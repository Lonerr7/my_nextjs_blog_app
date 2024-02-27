import React from 'react';
import FormStatelessControl from '../ui/FormStatelessControl';
import { RegisterUserInputFields } from '@/types/userTypes';
import TextBetweenLines from '../ui/TextBetweenLines';
import Link from 'next/link';

const ForgotPasswordForm = () => {
  return (
    <div className="form">
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

      <TextBetweenLines>Or</TextBetweenLines>

      <Link className="form-btn-2" href="/login">
        Log In
      </Link>
    </div>
  );
};

export default ForgotPasswordForm;
