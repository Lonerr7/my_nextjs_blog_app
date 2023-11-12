import { getServerSession } from 'next-auth';
import ClientTest from './components/ClientTest';
import { authConfig } from '@/configs/auth';

export default async function Home() {
  const session = await getServerSession(authConfig);

  console.log(`home session`, session);

  return (
    <div>
      <ClientTest />
    </div>
  );
}
