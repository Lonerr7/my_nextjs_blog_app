'use client';

import { LoginFormState } from '@/types/authTypes';
import { SignInResponse, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useState, FormEvent, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import FormControl from '../ui/FormControl';

const LogInForm: FC = () => {
  const [{ email, password, passwordConfirm }, setFormState] =
    useState<LoginFormState>({
      email: '',
      password: '',
      passwordConfirm: '',
    });
  const [signInResponse, setSignInResponse] = useState<
    SignInResponse | undefined
  >();

  const router = useRouter();

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error('Passwords are not the same!');
      return;
    }

    const toastId = toast.loading('Loading');

    const response = await signIn('credentials', {
      email,
      password,
      passwordConfirm,
      redirect: false,
    });

    toast.dismiss(toastId);
    setSignInResponse(response);
  };

  useEffect(() => {
    if (signInResponse && signInResponse.ok) {
      router.refresh();
    } else if (signInResponse && signInResponse.error === 'CredentialsSignin') {
      toast.error('Wrong email or password');
    }

    // eslint-disable-next-line
  }, [signInResponse]);

  return (
    <form
      className="bg-white rounded-lg shadow-sm dark:bg-bg-light-dark max-w-[500px] mx-[auto] p-5"
      onSubmit={submitForm}
    >
      <FormControl
        value={email}
        labelValue="Email"
        stateFieldToChange="email"
        setFromState={setFormState}
      />
      <FormControl
        value={password}
        labelValue="Password"
        stateFieldToChange="password"
        setFromState={setFormState}
      />
      <FormControl
        value={passwordConfirm}
        labelValue="Confirm your password"
        stateFieldToChange="passwordConfirm"
        setFromState={setFormState}
      />
      <button
        className="flex w-full justify-center rounded-md bg-indigo-600 mb-5 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm transition delay-30 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default LogInForm;
