import React from 'react';

interface Props {
  type: 'button' | 'submit';
  btnText: string;
  isFetching: boolean;
  loadingText: string;
  customClassName?: string;
  handleSubmit: () => void;
}

const SubmitLoadingBtn: React.FC<Props> = ({
  type,
  btnText,
  isFetching,
  loadingText,
  customClassName,
  handleSubmit,
}) => {
  return (
    <button
      className={`form-btn ${customClassName}`}
      type={type}
      onClick={handleSubmit}
      disabled={isFetching}
    >
      {!isFetching ? btnText : `${loadingText}...`}
    </button>
  );
};

export default SubmitLoadingBtn;
