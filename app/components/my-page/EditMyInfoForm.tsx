'use client';

import { FC } from 'react';
import { updateMyInfo } from '@/actions/updateMyInfo';
import FormStatelessControl from '../ui/FormStatelessControl';
import { toast } from 'react-hot-toast';
import FormButton from '../ui/FormButton';

// Данные поля по умолчанию строки, я оставил знак вопроса для того, чтобы не забыть, что они могу быть пустой строкой, то есть falsy value
interface Props {
  username?: string;
  job?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  status?: string;
}

const EditMyInfoForm: FC<Props> = ({
  username,
  job,
  instagram,
  facebook,
  twitter,
  youtube,
  status,
}) => {
  const clientAction = async (formData: FormData) => {
    const response = (await updateMyInfo(formData)) as {
      message?: string;
    };

    if (response?.message) {
      toast.error(response.message);
    }

    if (!response?.message) {
      toast.success('Successfully updated!');
    }
  };

  return (
    <form className="form my-page__form" action={clientAction}>
      <FormStatelessControl
        htmlFor="username"
        labelValue="Username"
        defaultvalue={username}
        placeholder="Enter your username"
        required
      />
      <FormStatelessControl
        htmlFor="job"
        labelValue="Job"
        defaultvalue={job}
        placeholder="Enter your job"
      />
      <FormStatelessControl
        htmlFor="status"
        labelValue="Status"
        defaultvalue={status}
        placeholder="Enter your status"
        isTextarea
      />
      <FormStatelessControl
        htmlFor="instagram"
        labelValue="Instagram"
        defaultvalue={instagram}
        placeholder="Enter your instagram"
      />
      <FormStatelessControl
        htmlFor="facebook"
        labelValue="Facebook"
        defaultvalue={facebook}
        placeholder="Enter your facebook"
      />
      <FormStatelessControl
        htmlFor="youtube"
        labelValue="Youtube"
        defaultvalue={youtube}
        placeholder="Enter your youtube"
      />
      <FormStatelessControl
        htmlFor="twitter"
        labelValue="Twitter"
        defaultvalue={twitter}
        placeholder="Enter your twitter"
      />

      <div className="w-full">
        <FormButton btnText="Edit my page" loadingText="Sending" />
      </div>
    </form>
  );
};

export default EditMyInfoForm;
