import 'react-loading-skeleton/dist/skeleton.css';
import UsersLoadingSkeleton from './UsersLoadingSkeleton';
import CommonSkeleton from './CommonSkeleton';

const UsersPageLoadingSkeleton = () => {
  return (
    <div>
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-8"
        className="py-3"
        width="50%"
      />
      <div className="mb-5">
        <UsersLoadingSkeleton />
      </div>
      <CommonSkeleton
        containerClassName="block w-full flex justify-center mb-8"
        height="40px"
        width="292px"
      />
    </div>
  );
};

export default UsersPageLoadingSkeleton;
