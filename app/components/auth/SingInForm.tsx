'use client';

import { registerUser } from '@/services/authServices';
import { signIn } from 'next-auth/react';
import { FC, useState, FormEvent } from 'react';
import GoogleButton from './GoogleButton';

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
      className="dark:bg-bg-light-dark max-w-[500px] mx-[auto] text-center p-5"
      onSubmit={submitForm}
    >
      <div>
        <label className="block" htmlFor="username"></label>
        <input
          className="w-[100%] py-2 px-4 rounded-lg"
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
      <div>
        <label className="block" htmlFor="email">
          Email
        </label>
        <input
          className=""
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
      <div>
        <label className="block" htmlFor="username">
          Password
        </label>
        <input
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
      <div>
        <label className="block" htmlFor="passwordConfirm">
          Confirm your password
        </label>
        <input
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
      <button type="submit">Submit</button>

      <p>or</p>
      <GoogleButton />

      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
  );
};

export default SingInForm;
