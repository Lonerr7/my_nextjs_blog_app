import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import UsersLoadingSkeleton from './UsersLoadingSkeleton';

const UsersPageLoadingSkeleton = () => {
  return (
    <div>
      <Skeleton
        containerClassName="block w-full flex justify-center mb-8"
        className="py-3 dark:bg-item-bg-dark"
        width="50%"
        enableAnimation={false}
      />
      <div className="mb-5">
        <UsersLoadingSkeleton />
      </div>
      <Skeleton
        containerClassName="block w-full flex justify-center mb-8"
        className="dark:bg-item-bg-dark"
        height="40px"
        width="292px"
        enableAnimation={false}
      />
    </div>
  );
};

export default UsersPageLoadingSkeleton;
