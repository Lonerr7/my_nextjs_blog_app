import { FC } from 'react';
import Search from '../components/common/Search';
import UsersList from '../components/Users/Users';

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
      <UsersList query={query} />
    </section>
  );
};

export default Users;
