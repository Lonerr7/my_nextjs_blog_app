import { FC, Suspense } from 'react';
import Search from '../components/common/Search';
import UsersList from '../components/Users/Users';
import UsersLoadingSkeleton from '../components/ui/skeletons/UsersLoadingSkeleton';

interface Props {
  searchParams?: {
    query?: string;
  };
}

const Users: FC<Props> = async ({ searchParams }) => {
  const query = searchParams?.query || '';

  return (
    <section>
      <Search palceholder="Search for a user" />
      <Suspense key={query} fallback={<UsersLoadingSkeleton />}>
        <UsersList query={query} />
      </Suspense>
    </section>
  );
};

export default Users;
