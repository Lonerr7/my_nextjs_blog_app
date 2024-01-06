import CommonSkeleton from './CommonSkeleton';

const BlogpostsLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <CommonSkeleton height="498px" borderRadius="0.75rem" />
      <CommonSkeleton height="498px" borderRadius="0.75rem" />
      <CommonSkeleton height="498px" borderRadius="0.75rem" />
    </div>
  );
};

export default BlogpostsLoadingSkeleton;
