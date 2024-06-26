import CommonSkeleton from '../CommonSkeleton';

const BlogpostsLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-5 lg:grid-cols-2 xsm:grid-cols-1">
      <CommonSkeleton height="498px" borderRadius="0.75rem" />
      <CommonSkeleton height="498px" borderRadius="0.75rem" />
      <CommonSkeleton height="498px" borderRadius="0.75rem" />
    </div>
  );
};

export default BlogpostsLoadingSkeleton;
