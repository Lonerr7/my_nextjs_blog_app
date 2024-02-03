'use client';

import { useEffect } from 'react';
import { ImCross } from 'react-icons/im';

interface Props {
  children: React.ReactNode;
  customWrapperClassName?: string;
  customBodyClassName?: string;
  customCloseBtnClassName?: string;
  closePopup: () => void;
}

const PopupContainer: React.FC<Props> = ({
  closePopup,
  children,
  customBodyClassName,
  customWrapperClassName,
  customCloseBtnClassName,
}) => {
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

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <div
      className={`fixed w-full h-full inset-x-0 inset-y-0 bg-[#000000cc] z-30 flex justify-center items-center popup-container ${customWrapperClassName}`}
      onClick={closePopup}
    >
      <div
        className={`relative w-[600px] h-[400px] p-4 bg-light-gray rounded-xl dark:bg-dark-blue flex flex-col items-center justify-center z-40 ${customBodyClassName}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className={`absolute top-[10px] right-[10px] transition delay-[30ms] hover:text-red-500 ${customCloseBtnClassName}`}
          type="button"
          onClick={closePopup}
        >
          <ImCross size={20} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default PopupContainer;
