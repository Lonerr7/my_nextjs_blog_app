'use client';

import { updateMyProfilePic } from '@/actions/updateMyProfilePic';
import ImageInput from '@/app/components/common/ImageInputWithPreview';
import FormButton from '@/app/components/ui/FormButton';
import { convertBase64 } from '@/utils/convertToBase64';
import { toast } from 'react-hot-toast';

const UpdateMyProfilePicPage = () => {
  const clientAction = async (formData: FormData) => {
    const image = formData.get('image') as File | null;
    console.log(image);

    if (!image?.name) {
      toast.error('Please select an image!');
      return;
    }

    const base64Image = await convertBase64(image); // !!!!!!!!!!!!!!!!!! Обработать ошибки
    console.log(base64Image);

    formData.set('image', base64Image as string);

    const response = await updateMyProfilePic(formData);

    if (response?.errMessage) {
      toast.error(response.errMessage);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <h1 className="page-title">Update your profile picture</h1>
      <form action={clientAction}>
        <ImageInput />
        <FormButton
          customClassName="!w-1/2"
          btnText="Save"
          loadingText="Sending"
        />
      </form>
    </section>
  );
};

export default UpdateMyProfilePicPage;
