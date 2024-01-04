import 'react-loading-skeleton/dist/skeleton.css';
import CommonSkeleton from './CommonSkeleton';

const UserLoadingSkeleton = () => {
  return (
    <CommonSkeleton
      className="h-[149px] dark:bg-item-bg-dark"
      borderRadius="0.75rem"
    />
  );
};

const UsersLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <UserLoadingSkeleton />
      <UserLoadingSkeleton />
      <UserLoadingSkeleton />
      <UserLoadingSkeleton />
      <UserLoadingSkeleton />
      <UserLoadingSkeleton />
    </div>
  );
};

export default UsersLoadingSkeleton;
