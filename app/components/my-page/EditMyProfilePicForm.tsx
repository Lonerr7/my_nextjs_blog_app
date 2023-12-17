'use client';

import { updateMyProfilePic } from '@/actions/updateMyProfilePic';
import ImageInputWithDrag from '@/app/components/common/ImageInputWithDrag';
import { convertBase64 } from '@/utils/convertToBase64';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

const EditMyProfilePicForm: React.FC = () => {
  const [imageFile, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const clientAction = async (formData: FormData) => {
    if (!imageFile?.name) {
      toast.error('Please select an image!');
      return;
    }

    const base64Image = await convertBase64(imageFile);
    formData.set('image', base64Image as string);

    const { errMessage, success } = await updateMyProfilePic(formData);

    if (errMessage) {
      toast.error(errMessage);
      return;
    }

    if (success) {
      toast.success('Success!');

      setFile(undefined);
      if (inputRef && inputRef?.current?.value) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <form className="w-1/2" action={clientAction}>
      <ImageInputWithDrag
        file={imageFile}
        inputRef={inputRef}
        setFile={setFile}
      />
    </form>
  );
};

export default EditMyProfilePicForm;
