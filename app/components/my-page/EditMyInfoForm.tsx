'use client';

import { MyInfoToChange } from '@/types/myPageTypes';
import { useState, FC } from 'react';
import FormControl from '../ui/FormControl';
import { updateMyInfo } from '@/actions/actions';

// Данные поля по умолчанию строки, я оставил знак вопроса для того, чтобы не забыть, что они могу быть пустой строкой, то есть falsy value
interface Props {
  username?: string;
  image?: string;
  job?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  status?: string;
}

const EditMyInfoForm: FC<Props> = ({
  username,
  image,
  job,
  instagram,
  facebook,
  twitter,
  youtube,
  status,
}) => {
  const [formState, setFormState] = useState<MyInfoToChange>({
    username: username || '',
    image: image || '',
    job: job || '',
    facebook: facebook || '',
    instagram: instagram || '',
    twitter: twitter || '',
    youtube: youtube || '',
    status: status || '',
  });

  return (
    <form action={updateMyInfo}>
      <FormControl
        htmlFor="username"
        labelValue="Username"
        setFromState={setFormState}
        stateFieldToChange="username"
        value={formState.username}
      />
      <FormControl
        htmlFor="job"
        labelValue="Job"
        setFromState={setFormState}
        stateFieldToChange="job"
        value={formState.job}
      />
      <FormControl
        htmlFor="status"
        labelValue="Status"
        setFromState={setFormState}
        stateFieldToChange="status"
        value={formState.status}
      />
      <FormControl
        htmlFor="instagram"
        labelValue="Instagram"
        setFromState={setFormState}
        stateFieldToChange="instagram"
        value={formState.instagram}
      />
      <FormControl
        htmlFor="facebook"
        labelValue="Facebook"
        setFromState={setFormState}
        stateFieldToChange="facebook"
        value={formState.facebook}
      />
      <FormControl
        htmlFor="youtube"
        labelValue="Youtube"
        setFromState={setFormState}
        stateFieldToChange="youtube"
        value={formState.youtube}
      />
      <FormControl
        htmlFor="twitter"
        labelValue="Twitter"
        setFromState={setFormState}
        stateFieldToChange="twitter"
        value={formState.twitter}
      />

      <button type="submit">Change</button>
    </form>
  );
};

export default EditMyInfoForm;
