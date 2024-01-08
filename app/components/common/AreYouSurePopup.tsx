'use client';

import { ImCross } from 'react-icons/im';
import FormButton from '../ui/FormButton';
import { useEffect } from 'react';

interface Props {
  popupPhrase: string;
  closePopup: () => void;
}

const AreYouSurePopup: React.FC<Props> = ({ popupPhrase, closePopup }) => {
  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleEscKey);

    return () => {
      document.removeEventListener('keyup', handleEscKey);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="fixed w-full h-full inset-x-0 inset-y-0 bg-[#000000cc] z-30 flex justify-center items-center"
      onClick={closePopup}
    >
      <div
        className="relative w-[600px] h-[400px] px-4 bg-light-gray rounded-xl dark:bg-dark-blue flex flex-col items-center justify-center z-40"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="absolute top-[10px] right-[10px] transition delay-[30ms] hover:text-red-500"
          type="button"
          onClick={closePopup}
        >
          <ImCross size={20} />
        </button>
        <p className="mb-10 text-2xl text-center font-medium">
          Are you sure you want to {popupPhrase}?
        </p>

        <div className="w-full flex items-center justify-center">
          <FormButton
            customClassName="!w-1/3 !mr-4 !bg-red-600 hover:!bg-red-500"
            btnText="Yes"
            loadingText="Deleting"
          />
          <button
            className="form-btn !w-1/3"
            type="button"
            onClick={closePopup}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSurePopup;
