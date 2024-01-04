import { FC, Suspense } from 'react';
import Search from '../components/common/Search';
import UsersList from '../components/Users/Users';
import UsersLoadingSkeleton from '../components/ui/skeletons/UsersLoadingSkeleton';
import { getUsersPages } from '@/services/userServices';
import Pagination from '../components/ui/Pagination';
import { Metadata } from 'next';
import UsersPageLoadingSkeleton from '../components/ui/skeletons/UsersPageLoadingSkeleton';

export const metadata: Metadata = {
  title: 'Users | Meta Blog',
};

interface Props {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

const Users: FC<Props> = async ({ searchParams }) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getUsersPages(query);

  return (
    <section>
      <Search palceholder="Search for a user" />
      <Suspense key={query + currentPage} fallback={<UsersLoadingSkeleton />}>
        <UsersList query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
};

export default Users;
