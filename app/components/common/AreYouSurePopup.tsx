'use client';

import FormButton from '../ui/FormButton';

interface Props {
  popupPhrase: string;
  closePopup: () => void;
}

const AreYouSurePopup: React.FC<Props> = ({ popupPhrase, closePopup }) => {
  return (
    <>
      <p className="mb-10 text-2xl text-center font-medium">
        Are you sure you want to {popupPhrase}?
      </p>

      <div className="w-full flex items-center justify-center">
        <FormButton
          customClassName="!w-1/3 !mr-4 !bg-red-600 hover:!bg-red-500"
          btnText="Yes"
          loadingText="Deleting"
        />
        <button className="form-btn !w-1/3" type="button" onClick={closePopup}>
          No
        </button>
      </div>
    </>
  );
};

export default AreYouSurePopup;
