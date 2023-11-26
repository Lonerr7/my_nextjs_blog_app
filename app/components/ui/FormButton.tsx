import { FC } from 'react';
import { useFormStatus } from 'react-dom';

interface Props {
  btnText: string;
  loadingText: string;
}

const FormButton: FC<Props> = ({ btnText, loadingText }) => {
  const { pending } = useFormStatus();

  return (
    <button className="form-btn" type="submit">
      {pending ? `${loadingText}...` : btnText}
    </button>
  );
};

export default FormButton;
