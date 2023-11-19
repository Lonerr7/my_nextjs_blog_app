import { FC } from 'react';

interface Props {
  params: {
    userId: string;
  };
}

const UserPage: FC<Props> = ({ params: { userId } }) => {
  return <div>{userId}</div>;
};

export default UserPage;
