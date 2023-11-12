import { SetStateAction, Dispatch } from 'react';

export const handleFormChange = <T>(
  inputValue: string,
  key: keyof T,
  setFormState: Dispatch<SetStateAction<T>>
) => {
  setFormState((prevState) => ({
    ...prevState,
    [key]: inputValue,
  }));
};
