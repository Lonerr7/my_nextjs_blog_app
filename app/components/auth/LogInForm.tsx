'use client';

import { handleFormChange } from '@/utils/handleFormChange';
import { SignInResponse, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useState, FormEvent, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface FormState {
  email: string;
  password: string;
  passwordConfirm: string;
}

const LogInForm: FC = () => {
  const [{ email, password, passwordConfirm }, setFormState] =
    useState<FormState>({
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

    const response = await signIn('credentials', {
      email,
      password,
      passwordConfirm,
      redirect: false,
    });

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
      <div className="mb-6">
        <label
          className="block text-lg mb-2 font-medium leading-6 text-gray-900 dark:text-gray-300"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lg:text-lg sm:text-sm sm:leading-6 dark:text-white dark:bg-light-black"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            handleFormChange<FormState>(
              e.currentTarget.value,
              'email',
              setFormState
            );
          }}
          required
          placeholder="Enter your email..."
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-lg mb-2 font-medium leading-6 text-gray-900 dark:text-gray-300"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lg:text-lg sm:text-sm sm:leading-6 dark:text-white dark:bg-light-black"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            handleFormChange<FormState>(
              e.currentTarget.value,
              'password',
              setFormState
            );
          }}
          required
          placeholder="Enter your password..."
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-lg mb-2 font-medium leading-6 text-gray-900 dark:text-gray-300"
          htmlFor="passwordConfirm"
        >
          Confirm Password
        </label>
        <input
          className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lg:text-lg sm:text-sm sm:leading-6 dark:text-white dark:bg-light-black"
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => {
            handleFormChange<FormState>(
              e.currentTarget.value,
              'passwordConfirm',
              setFormState
            );
          }}
          required
          placeholder="Confirm your password..."
        />
      </div>
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
