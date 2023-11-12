import { FC } from 'react';
import SingInForm from '../components/auth/SingInForm';

const SignIn: FC = () => {
  return (
    <div>
      <h1 className="text-5xl text-center font-bold mb-24">Sign In</h1>
      <SingInForm />
    </div>
  );
};

export default SignIn;
