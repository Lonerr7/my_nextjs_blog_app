'use client';

import { useEffect } from 'react';
import { ImCross } from 'react-icons/im';

interface Props {
  closePopup: () => void;
  children: React.ReactNode;
}

const PopupContainer: React.FC<Props> = ({ closePopup, children }) => {
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
      className="fixed w-full h-full inset-x-0 inset-y-0 bg-[#000000cc] z-30 flex justify-center items-center popup-container"
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

        {children}
      </div>
    </div>
  );
};

export default PopupContainer;
