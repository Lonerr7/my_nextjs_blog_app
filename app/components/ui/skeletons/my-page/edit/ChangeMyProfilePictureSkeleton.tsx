import CommonSkeleton from '../../CommonSkeleton';

const ChangeMyProfilePictureSkeleton = () => {
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
        width="20%"
      />
      <CommonSkeleton
        containerClassName="w-1/2 h-[400px] block flex justify-center mx-auto mb-5"
        className="py-3"
      />
      <div className="flex item-center mb-5 w-1/2 mx-auto">
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
        width="20%"
      />
      <CommonSkeleton
        containerClassName="!w-1/2 block w-full flex justify-center mx-auto"
        className="py-3"
      />
    </div>
  );
};

export default ChangeMyProfilePictureSkeleton;
