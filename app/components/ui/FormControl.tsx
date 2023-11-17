import { LoginFormState, RegisterFormState } from '@/types/authTypes';
import { handleFormChange } from '@/utils/handleFormChange';
import { Dispatch, SetStateAction } from 'react';

interface Props<T extends RegisterFormState | LoginFormState> {
  value: string;
  stateFieldToChange: keyof T;
  labelValue: string;
  htmlFor: string;
  setFromState: Dispatch<SetStateAction<T>>;
}

const FormControl = <T extends RegisterFormState | LoginFormState>({
  value,
  stateFieldToChange,
  labelValue,
  htmlFor,
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
        className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lg:text-lg sm:text-sm sm:leading-6 dark:text-white dark:bg-light-black"
        type={htmlFor === 'passwordConfirm' ? 'password' : htmlFor}
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
        required
        placeholder="Enter your email..."
      />
    </div>
  );
};

export default FormControl;
