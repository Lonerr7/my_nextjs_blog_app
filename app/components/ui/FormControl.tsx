import {
  ChangePasswordFormState,
  LoginFormState,
  RegisterFormState,
} from '@/types/authTypes';
import { MyInfoToChange } from '@/types/myPageTypes';
import { handleFormChange } from '@/utils/handleFormChange';
import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';

interface Props<
  T extends
    | RegisterFormState
    | LoginFormState
    | MyInfoToChange
    | ChangePasswordFormState
> {
  value: string;
  stateFieldToChange: keyof T;
  labelValue: string;
  htmlFor: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  placeholder: string;
  setFromState: Dispatch<SetStateAction<T>>;
}

const FormControl = <
  T extends
    | RegisterFormState
    | LoginFormState
    | MyInfoToChange
    | ChangePasswordFormState
>({
  value,
  stateFieldToChange,
  labelValue,
  htmlFor,
  type,
  required,
  placeholder,
  setFromState,
}: Props<T>) => {
  return (
    <div className="mb-6">
      <label
        className="block text-lg mb-2 font-medium leading-6 text-gray-900 dark:text-gray-300"
        htmlFor={htmlFor}
      >
        {labelValue}
      </label>
      <input
        className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 invalid:border-pink-500 invalid:text-pink-600
         focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 lg:text-lg sm:text-sm sm:leading-6 dark:focus:ring-white dark:text-white dark:invalid:text-pink-600 dark:invalid:focus:ring-pink-500"
        type={type ? type : 'text'}
        name={htmlFor}
        id={htmlFor}
        value={value}
        onChange={(e) => {
          handleFormChange(
            e.currentTarget.value,
            stateFieldToChange,
            setFromState
          );
        }}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormControl;
