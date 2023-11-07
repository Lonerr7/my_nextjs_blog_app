import { FC } from 'react';
import GoogleButton from '../components/auth/GoogleButton';
import SingInForm from '../components/auth/SingInForm';

const SignIn: FC = () => {
  return (
    <div>
      <SingInForm />
      <GoogleButton />
    </div>
  );
};

export default SignIn;
