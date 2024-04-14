'use client';

import { LoginFormState } from '@/types/authTypes';
import { SignInResponse, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, FormEvent, useEffect, useState } from 'react';
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
    <div className="form">
      <form onSubmit={submitForm}>
        <FormControl
          value={email}
          labelValue="Email"
          stateFieldToChange="email"
          setFromState={setFormState}
          htmlFor="email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <FormControl
          value={password}
          labelValue="Password"
          stateFieldToChange="password"
          setFromState={setFormState}
          htmlFor="password"
          type="password"
          placeholder="Enter your password"
          required
        />
        <FormControl
          value={passwordConfirm}
          labelValue="Confirm your password"
          stateFieldToChange="passwordConfirm"
          setFromState={setFormState}
          htmlFor="passwordConfirm"
          type="password"
          placeholder="Confirm your password"
          required
        />

        <button className="form-btn" type="submit">
          Submit
        </button>
      </form>

      <div className="flex items-center">
        <p className="mr-2">Forgot password?</p>
        <Link
          className="text-light-blue font-semibold transition-opacity hover:opacity-80"
          href="/forgot-password"
        >
          Reset Here
        </Link>
      </div>
    </div>
  );
};

export default LogInForm;
