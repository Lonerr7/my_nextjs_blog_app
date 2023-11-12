'use client';

import { useSession } from 'next-auth/react';

const ClientTest = () => {
  const { data: session } = useSession();

  console.log(session);

  return <div>ClientTest</div>;
};

export default ClientTest;
