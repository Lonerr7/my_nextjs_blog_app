import CommonSkeleton from '../../CommonSkeleton';

const DeleteMyPageSkeleton = () => {
  return (
    <div className='grow'>
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-8"
        className="py-3"
        width="40%"
      />
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-4"
        className="py-3"
        width="70%"
      />
      <CommonSkeleton
        containerClassName="block w-[200px] flex justify-center mx-auto"
        className="py-3"
      />
    </div>
  );
};

export default DeleteMyPageSkeleton;
