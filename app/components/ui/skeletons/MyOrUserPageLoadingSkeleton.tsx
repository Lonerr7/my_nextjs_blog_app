import React from 'react';
import CommonSkeleton from './CommonSkeleton';

const MyOrUserPageLoadingSkeleton = () => {
  return (
    <div>
      <CommonSkeleton
        className="mb-24"
        width="100%"
        height="269px"
        borderRadius="0.75rem"
      />
      <div className="grid grid-cols-3 gap-5">
        <CommonSkeleton height="498px" borderRadius="0.75rem" />
        <CommonSkeleton height="498px" borderRadius="0.75rem" />
        <CommonSkeleton height="498px" borderRadius="0.75rem" />
      </div>
    </div>
  );
};

export default MyOrUserPageLoadingSkeleton;
