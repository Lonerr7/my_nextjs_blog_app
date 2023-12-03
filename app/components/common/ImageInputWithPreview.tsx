'use client';

import { useState } from 'react';
import Avatar from '../Users/Avatar';

const ImageInput = () => {
  const [file, setFile] = useState<File>();

  const handleInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files && e.target.files[0];

    if (
      !inputFile ||
      (inputFile.size > 1024 * 1024 && !inputFile.type.startsWith('image/'))
    ) {
      alert('returning...');
      return;
    }

    setFile(inputFile);
  };

  return (
    <div>
      {file && <ImageInputPreview imageSrc={URL.createObjectURL(file)} />}
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={handleInputFile}
      />
    </div>
  );
};

interface ImagePreviewProps {
  imageSrc: string;
}

const ImageInputPreview = ({ imageSrc }: ImagePreviewProps) => {
  return (
    <div>
      <Avatar avatarURL={imageSrc} small />
    </div>
  );
};

export default ImageInput;
