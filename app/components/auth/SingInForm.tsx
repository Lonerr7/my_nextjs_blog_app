'use client';

import { registerUser } from '@/services/authServices';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useState, FormEvent } from 'react';

const SingInForm: FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const router = useRouter();

  const handleUsernameChange = (e: FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handlePasswordConfirm = (e: FormEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.currentTarget.value);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      console.log(`passwords are not the same`);
      return;
    }

    const user = await registerUser({
      username,
      email,
      password,
      passwordConfirm,
    });

    if (!user) {
      return;
    }

    console.log('user', user);

    const response = await signIn('credentials', {
      email: user.email,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
      callbackUrl: '/',
    });

    // console.log(`response from signIn from nextauth`, response);

    if (response && !response.error) {
      router.push('/');
    } else {
      console.log(`from here`);
      console.log(response);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="username">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Confirm your password</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={handlePasswordConfirm}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SingInForm;
