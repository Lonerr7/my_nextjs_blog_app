'use client';

import { useState, useRef } from 'react';
import Avatar from '../Users/Avatar';
import { toast } from 'react-hot-toast';

const ImageInput = () => {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files && e.target.files[0];

    if (
      !inputFile ||
      inputFile.size > 1024 ** 2 ||
      !inputFile.type.startsWith('image/')
    ) {
      setFile(undefined);

      if (inputRef && inputRef?.current?.value) {
        inputRef.current.value = '';
      }

      toast.error('Only images that are less than 2 mb are allowed!');
      return;
    }

    setFile(inputFile);
  };

  return (
    <div>
      {file && (
        <ImageInputPreview
          imageSrc={URL.createObjectURL(file)}
          inputRef={inputRef}
          setFile={setFile}
        />
      )}
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={handleInputFile}
        ref={inputRef}
      />
    </div>
  );
};

interface ImagePreviewProps {
  imageSrc: string;
  setFile: (value: React.SetStateAction<File | undefined>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const ImageInputPreview = ({
  imageSrc,
  inputRef,
  setFile,
}: ImagePreviewProps) => {
  const handleInputFileDelete = () => {
    setFile(undefined);
    if (inputRef && inputRef?.current?.value) {
      inputRef.current.value = '';
    }
  };

  return (
    <div>
      <Avatar
        avatarURL={imageSrc}
        small
        customClassName="w-[100px] h-[100px]"
      />
      <button onClick={handleInputFileDelete}>Delete selected Image</button>
    </div>
  );
};

export default ImageInput;
