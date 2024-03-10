import CommonSkeleton from '../CommonSkeleton';
import BlogpostsLoadingSkeleton from './BlogpostsLoadingSkeleton';

const BlogpostsPageLoadingSkeleton = () => {
  return (
    <div>
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-8"
        className="py-3"
        width="25%"
      />
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-8"
        className="py-3"
        width="50%"
      />
      <BlogpostsLoadingSkeleton />
    </div>
  );
};

export default BlogpostsPageLoadingSkeleton;
