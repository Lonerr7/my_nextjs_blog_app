import CommonSkeleton from '../../CommonSkeleton';

const DeleteMyPageSkeleton = () => {
  return (
    <div>
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-8"
        className="py-3"
        width="25%"
      />
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-4"
        className="py-3"
        width="50%"
      />
      <CommonSkeleton
        containerClassName="block w-[200px] flex justify-center mx-auto"
        className="py-3"
      />
    </div>
  );
};

export default DeleteMyPageSkeleton;
