import React from 'react';
import CommonSkeleton from '../CommonSkeleton';
import BlogpostsLoadingSkeleton from '../blogposts/BlogpostsLoadingSkeleton';

const MyOrUserPageLoadingSkeleton = () => {
  return (
    <div>
      <CommonSkeleton
        className="mb-24"
        width="100%"
        height="269px"
        borderRadius="0.75rem"
      />
      <BlogpostsLoadingSkeleton />
    </div>
  );
};

export default MyOrUserPageLoadingSkeleton;
