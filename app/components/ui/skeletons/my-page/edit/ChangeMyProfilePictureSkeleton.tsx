import CommonSkeleton from '../../CommonSkeleton';

const ChangeMyProfilePictureSkeleton = () => {
  return (
    <div className="grow w-full">
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-8"
        className="py-3"
        width="50%"
      />
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-4"
        className="py-3"
        width="40%"
      />
      <CommonSkeleton
        containerClassName="w-full h-[400px] block flex justify-center mx-auto mb-5"
        className="py-3"
      />
      <div className="flex item-center mb-5 w-full mx-auto">
        <CommonSkeleton
          containerClassName="w-[48px] h-[36px] block flex justify-center mr-4 grow"
          className="py-3"
        />
        <CommonSkeleton
          containerClassName="w-[48px] h-[36px] block flex justify-center grow"
          className="py-3"
        />
      </div>
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-4"
        className="py-3"
        width="40%"
      />
      <CommonSkeleton
        containerClassName="!w-full block w-full flex justify-center mx-auto"
        className="py-3"
      />
    </div>
  );
};

export default ChangeMyProfilePictureSkeleton;
