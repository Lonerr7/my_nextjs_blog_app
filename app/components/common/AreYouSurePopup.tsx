'use client';

import FormButton from '../ui/FormButton';

interface Props {
  popupPhrase: string;
}

const AreYouSurePopup: React.FC<Props> = ({ popupPhrase }) => {
  return (
    <>
      <p className="mb-10 mx-4 text-2xl text-center font-medium">
        Are you sure you want to {popupPhrase}
      </p>

      <div className="w-full flex items-center justify-center">
        <FormButton
          customClassName="!w-full !mb-0 !bg-red-600 hover:!bg-red-500"
          btnText="Yes"
          loadingText="Deleting"
        />
      </div>
    </>
  );
};

export default AreYouSurePopup;
