'use client';

import { updateMyProfilePic } from '@/actions/updateMyProfilePic';
import ImageInput from '@/app/components/common/ImageInputWithPreview';
import FormButton from '@/app/components/ui/FormButton';
import { convertBase64 } from '@/utils/convertToBase64';
import { toast } from 'react-hot-toast';

const EditMyProfilePicForm = () => {
  const clientAction = async (formData: FormData) => {
    const image = formData.get('image') as File | null;

    if (!image?.name) {
      toast.error('Please select an image!');
      return;
    }

    const base64Image = await convertBase64(image);
    formData.set('image', base64Image as string);

    const { errMessage, success } = await updateMyProfilePic(formData);

    if (errMessage) {
      toast.error(errMessage);
      return;
    }

    if (success) {
      toast.success('Success!');
    }
  };

  return (
    <form action={clientAction}>
      <ImageInput />
      <FormButton
        customClassName="!w-1/2"
        btnText="Save"
        loadingText="Sending"
      />
    </form>
  );
};

export default EditMyProfilePicForm;
