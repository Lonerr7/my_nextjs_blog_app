import React from 'react';
import CommonSkeleton from '../../CommonSkeleton';

const ChangePasswordSkeleton = () => {
  return (
    <div>
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-8"
        className="py-3"
        width="25%"
      />
      <CommonSkeleton
        containerClassName="max-w-[500px] h-[357px] block flex justify-center mx-auto mb-5"
        className="py-3"
      />
    </div>
  );
};

export default ChangePasswordSkeleton;
