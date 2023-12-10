'use client';

import { updateMyProfilePic } from '@/actions/updateMyProfilePic';
import ImageInput from '@/app/components/common/ImageInputWithPreview';
import { convertBase64 } from '@/utils/convertToBase64';
import { toast } from 'react-hot-toast';

const EditMyProfilePicForm: React.FC = () => {
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
    <form className="w-1/2" action={clientAction}>
      <ImageInput />
    </form>
  );
};

export default EditMyProfilePicForm;
