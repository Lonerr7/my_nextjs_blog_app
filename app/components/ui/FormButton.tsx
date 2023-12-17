import { FC } from 'react';
import { useFormStatus } from 'react-dom';

interface Props {
  customClassName?: string;
  btnText: string;
  loadingText: string;
  disabled?: boolean;
}

const FormButton: FC<Props> = ({
  customClassName,
  btnText,
  loadingText,
  disabled,
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`form-btn ${customClassName}`}
      type="submit"
      disabled={disabled}
    >
      {pending ? `${loadingText}...` : btnText}
    </button>
  );
};

export default FormButton;
