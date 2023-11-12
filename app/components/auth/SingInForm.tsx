'use client';

import { registerUser } from '@/services/authServices';
import { signIn } from 'next-auth/react';
import { FC, useState, FormEvent } from 'react';
import GoogleButton from './GoogleButton';
import Link from 'next/link';

interface FormState {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SingInForm: FC = () => {
  const [{ email, password, passwordConfirm, username }, setFormState] =
    useState<FormState>({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormChange = (inputValue: string, key: keyof FormState) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: inputValue,
    }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setErrorMessage('Passwords are not the same!');
      return;
    }

    const { user, error } = await registerUser({
      username,
      email,
      password,
      passwordConfirm,
    });

    if (!user && error) {
      setErrorMessage(error);
      return;
    }

    await signIn('credentials', {
      email,
      password,
      passwordConfirm,
      callbackUrl: '/',
    });
  };

  return (
    <form
      className="bg-white rounded-lg shadow-sm dark:bg-bg-light-dark max-w-[500px] mx-[auto] p-5"
      onSubmit={submitForm}
    >
      <div className="mb-6">
        <label
          className="block text-lg mb-2 font-medium leading-6 text-gray-900 dark:text-gray-300"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lg:text-lg sm:text-sm sm:leading-6 dark:text-white dark:bg-light-black"
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => {
            handleFormChange(e.currentTarget.value, 'username');
          }}
          required
          placeholder="Enter your username..."
        />
      </div>
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
            handleFormChange(e.currentTarget.value, 'email');
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
            handleFormChange(e.currentTarget.value, 'password');
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
            handleFormChange(e.currentTarget.value, 'passwordConfirm');
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

      <div className="flex items-center justify-center mb-6">
        <span className="block w-[43%] bg-neutral-300 h-[1px] dark:bg-neutral-500"></span>
        <p className="relative bg-center mx-auto max-w-[100px]">Or</p>
        <span className="block w-[43%] bg-neutral-300 h-[1px] dark:bg-neutral-500"></span>
      </div>

      <div className="flex items-center xsm:flex-col justify-between ">
        <Link
          className="block w-[48%] rounded-md p-3 text-center font-medium bg-light-black text-white transition delay-30 hover:opacity-80 xsm:w-full xsm:mb-4"
          href="/login"
        >
          Log In
        </Link>
        <GoogleButton />
      </div>

      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
  );
};

export default SingInForm;
