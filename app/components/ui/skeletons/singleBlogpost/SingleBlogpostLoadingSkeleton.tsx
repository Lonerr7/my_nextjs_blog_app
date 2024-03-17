import CommonSkeleton from '../CommonSkeleton';

const SingleBlogpostLoadingSkeleton = () => {
  return (
    <div className='max-w-[800px] mx-auto'>
      <div className="flex justify-between items-center mb-4">
        <CommonSkeleton
          className="w-[100px] mr-3"
          height="28px"
          borderRadius="0.375rem"
        />
        <div className="flex justify-between items-center w-[10%]">
          <CommonSkeleton
            className="mr-1"
            width="30px"
            height="30px"
            borderRadius="0.75rem"
          />
          <CommonSkeleton width="30px" height="30px" borderRadius="0.75rem" />
        </div>
      </div>

      <CommonSkeleton
        className="w-1/2 mb-3"
        height="40px"
        borderRadius="0.75rem"
      />

      <div className="flex justify-between items-center mb-5 w-[10%]">
        <CommonSkeleton
          className="mr-2"
          width="30px"
          height="30px"
          borderRadius="0.75rem"
        />
        <CommonSkeleton width="30px" height="30px" borderRadius="0.75rem" />
      </div>

      <CommonSkeleton
        className="mb-8"
        width="100%"
        height="70px"
        borderRadius="0.75rem"
      />

      <CommonSkeleton
        className="mb-8"
        width="100%"
        height="462px"
        borderRadius="0.75rem"
      />

      <CommonSkeleton width="100%" height="200px" borderRadius="0.75rem" />
    </div>
  );
};

export default SingleBlogpostLoadingSkeleton;
