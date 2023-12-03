'use client';

import { CldUploadButton } from 'next-cloudinary';

const UploadImage = () => {
  return (
    <div>
      <CldUploadButton
        uploadPreset="ytaw55c5"
        onSuccess={(results) => {
          console.log(results);
        }}
      />
    </div>
  );
};

export default UploadImage;
