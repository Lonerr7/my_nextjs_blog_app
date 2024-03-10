import { FC, Suspense } from 'react';
import Search from '../components/common/Search';
import UsersList from '../components/Users/Users';
import UsersLoadingSkeleton from '../components/ui/skeletons/users/UsersLoadingSkeleton';
import { getUsersPages } from '@/services/userServices';
import Pagination from '../components/ui/Pagination';
import { Metadata } from 'next';
import { SearchQueriesNames } from '@/types/requestTypes';

export const metadata: Metadata = {
  title: 'Users | Meta Blog',
};

interface Props {
  searchParams?: {
    usersSearchQuery?: string;
    page?: string;
  };
}

const Users: FC<Props> = async ({ searchParams }) => {
  const query = searchParams?.usersSearchQuery || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getUsersPages(query);

  return (
    <section>
      <Search
        palceholder="Search for a user"
        queryToChange={SearchQueriesNames.USERS_SEARCH_QUERY}
      />

      <Suspense key={query + currentPage} fallback={<UsersLoadingSkeleton />}>
        <UsersList query={query} currentPage={currentPage} />
      </Suspense>

      <Pagination
        totalPages={totalPages}
        wrapperClassName="mt-5 flex justify-center"
      />
    </section>
  );
};

export default Users;
