'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { isImageInputFileValid } from '@/utils/validateImageInputFile';
import FormButton from '../ui/FormButton';

interface Props {
  file: File | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const ImageInputWithDrag: React.FC<Props> = ({ file, inputRef, setFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files && e.target.files[0];

    if (!inputFile || !isImageInputFileValid(inputFile, inputRef, setFile)) {
      toast.error('Only images that are less than 2 mb are allowed!');
      return;
    }

    setFile(inputFile);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const inputFile = e.dataTransfer.files[0];

    if (!inputFile || !isImageInputFileValid(inputFile, inputRef, setFile)) {
      toast.error('Only images that are less than 2 mb are allowed!');
      return;
    }

    setFile(inputFile);
  };

  const handleInputFileDelete = () => {
    setFile(undefined);
    if (inputRef && inputRef?.current?.value) {
      inputRef.current.value = '';
    }
  };

  return (
    <>
      <div
        className={`w-full h-[400px] ${
          file && 'bg-green-100 dark:bg-green-950'
        } border-4 border-[#BABABF] border-dashed flex justify-center items-center cursor-pointer mb-8 px-4 hover:opacity-60 ${
          isDragging && 'bg-[#e0e1e2] dark:bg-[#282b46]'
        }`}
        onDragOver={handleDrag}
        onDragEnter={() => {
          setIsDragging(true);
        }}
        onDragLeave={() => {
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {!file ? (
          <p className="text-3xl text-light-black dark:text-light-gray text-center">
            Select or drop here your new profile picture
          </p>
        ) : (
          <p>The file was successfully chosen! Name: {file.name}</p>
        )}
      </div>
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={handleInputFile}
        ref={inputRef}
        hidden
      />
      <div className="flex items-center justify-between">
        <button
          className="form-btn !w-[48%] !mr-4 !bg-red-600 disabled:!bg-red-300 hover:!bg-red-500"
          disabled={file ? false : true}
          onClick={handleInputFileDelete}
        >
          Delete selected image
        </button>
        <FormButton
          customClassName="!w-[48%]"
          btnText="Save"
          loadingText="Sending"
        />
      </div>
    </>
  );
};

export default ImageInputWithDrag;
