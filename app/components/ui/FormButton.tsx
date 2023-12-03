import { FC } from 'react';
import { useFormStatus } from 'react-dom';

interface Props {
  customClassName?: string;
  btnText: string;
  loadingText: string;
}

const FormButton: FC<Props> = ({ customClassName, btnText, loadingText }) => {
  const { pending } = useFormStatus();

  return (
    <button className={`form-btn ${customClassName}`} type="submit">
      {pending ? `${loadingText}...` : btnText}
    </button>
  );
};

export default FormButton;
