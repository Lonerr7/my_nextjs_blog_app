import { FC } from 'react';
import GoogleButton from '../components/auth/GoogleButton';

const SignIn: FC = async () => {
  return (
    <div>
      <h1>Sign In</h1>
      <GoogleButton />
    </div>
  );
};

export default SignIn;
