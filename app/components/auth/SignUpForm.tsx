'use client';

import { SignInResponse, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { registerUserAction } from '@/actions/authActions';
import { getFormDataFieldValues } from '@/utils/getFormDataFieldValues';
import { RegisterUserInputFields } from '@/types/userTypes';
import FormStatelessControl from '../ui/FormStatelessControl';
import TextBetweenLines from '../ui/TextBetweenLines';

const SignUpForm = () => {
  const [canRedirect, setCanRedirect] = useState(false);
  const router = useRouter();

  const clientAction = async (formData: FormData) => {
    const inputData = getFormDataFieldValues(
      formData,
      RegisterUserInputFields.USERNAME,
      RegisterUserInputFields.EMAIL,
      RegisterUserInputFields.PASSWORD,
      RegisterUserInputFields.PASSWORD_CONFIRM
    );
    const { user, message } = await registerUserAction(inputData);

    if (!user && message) {
      toast.error(message);
      return;
    }

    // if everything is ok => log the user in
    toast.promise(
      signIn('credentials', {
        email: inputData.email,
        password: inputData.password,
        passwordConfirm: inputData.passwordConfirm,
        redirect: false,
      }),
      {
        loading: 'Signing in...',
        success: (data: SignInResponse | undefined) => {
          if (data && data.ok) {
            setCanRedirect(true);
          }

          return 'Success!';
        },
        error: (err) => `Error! ${err.toString()}`,
      }
    );
  };

  // Redirecting programatically if everything is ok
  useEffect(() => {
    setTimeout(() => {
      router.refresh();
    }, 1000);

    // eslint-disable-next-line
  }, [canRedirect]);

  return (
    <div className="form">
      <form action={clientAction}>
        <FormStatelessControl
          defaultvalue=""
          labelValue="Username"
          htmlFor={RegisterUserInputFields.USERNAME}
          required
          placeholder="Eneter your username"
        />
        <FormStatelessControl
          defaultvalue=""
          labelValue="Email"
          htmlFor={RegisterUserInputFields.EMAIL}
          required
          placeholder="Enter your email"
        />
        <FormStatelessControl
          defaultvalue=""
          labelValue="Password"
          htmlFor={RegisterUserInputFields.PASSWORD}
          required
          placeholder="Eneter your password"
        />
        <FormStatelessControl
          defaultvalue=""
          labelValue="Confirm your password"
          htmlFor={RegisterUserInputFields.PASSWORD_CONFIRM}
          required
          placeholder="Confirm your password"
        />
        <button className="form-btn" type="submit">
          Sign up
        </button>
      </form>

      <TextBetweenLines>Or</TextBetweenLines>

      <div className="flex items-center xsm:flex-col justify-between">
        <Link
          className="form-btn-2"
          href="/login"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
