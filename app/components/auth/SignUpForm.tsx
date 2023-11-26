'use client';

import { registerUser } from '@/services/authServices';
import { SignInResponse, signIn } from 'next-auth/react';
import { FC, useState, FormEvent, useEffect } from 'react';
import GoogleButton from './GoogleButton';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { RegisterFormState } from '@/types/authTypes';
import FormControl from '../ui/FormControl';

const SignUpForm: FC = () => {
  const [{ email, password, passwordConfirm, username }, setFormState] =
    useState<RegisterFormState>({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
  const [canRedirect, setCanRedirect] = useState(false);

  const router = useRouter();

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.length <= 2) {
      toast.error('Username is too short!');
      return;
    }
    if (username.length > 20) {
      toast.error('Username is too long!');
      return;
    }
    if (password !== passwordConfirm) {
      toast.error('Passwords are not the same!');
      return;
    }

    const { user, error } = await registerUser({
      username,
      email,
      password,
      passwordConfirm,
    });

    // universal error handler
    if (!user && error) {
      toast.error(error);
      return;
    }

    // Signing user in and showing status messages and erros with react-hot-toast
    toast.promise(
      signIn('credentials', {
        email,
        password,
        passwordConfirm,
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
      <form onSubmit={submitForm}>
        <FormControl
          value={username}
          stateFieldToChange="username"
          labelValue="Username"
          htmlFor="username"
          required
          setFromState={setFormState}
        />
        <FormControl
          value={email}
          stateFieldToChange="email"
          labelValue="Email"
          htmlFor="email"
          required
          setFromState={setFormState}
        />
        <FormControl
          value={password}
          stateFieldToChange="password"
          labelValue="Password"
          htmlFor="password"
          required
          setFromState={setFormState}
        />
        <FormControl
          value={passwordConfirm}
          stateFieldToChange="passwordConfirm"
          labelValue="Confirm your password"
          htmlFor="passwordConfirm"
          required
          setFromState={setFormState}
        />
        <button
          className="form-btn"
          type="submit"
        >
          Sign up
        </button>

        <div className="flex items-center justify-center mb-6">
          <span className="block w-[43%] bg-neutral-300 h-[1px] dark:bg-neutral-500"></span>
          <p className="relative bg-center mx-auto max-w-[100px]">Or</p>
          <span className="block w-[43%] bg-neutral-300 h-[1px] dark:bg-neutral-500"></span>
        </div>
      </form>

      <div className="flex items-center xsm:flex-col justify-between ">
        <Link
          className="block w-[48%] rounded-md p-3 text-center font-medium bg-light-black text-white transition delay-30 hover:opacity-80 xsm:w-full xsm:mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-white"
          href="/login"
        >
          Log In
        </Link>
        <GoogleButton />
      </div>
    </div>
  );
};

export default SignUpForm;
