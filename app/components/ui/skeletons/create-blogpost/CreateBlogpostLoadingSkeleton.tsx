import CommonSkeleton from '../CommonSkeleton';

const CreateBlogpostPageLoadingSkeleton = () => {
  return (
    <div>
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-8"
        className="py-3"
        width="25%"
      />
      <CommonSkeleton
        containerClassName="h-[400px] block w-full flex justify-center mb-8"
        className="py-3"
      />
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-4"
        className="py-3"
      />
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-2"
        className="py-3"
      />
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-2"
        className="py-3"
      />
      <CommonSkeleton
        containerClassName="h-[242px] block w-full flex justify-center"
        className="py-3"
      />
    </div>
  );
};

export default CreateBlogpostPageLoadingSkeleton;
