import EditMyInfoForm from '@/app/components/my-page/EditMyInfoForm';
import { authConfig } from '@/configs/auth';
import { getSingleUser } from '@/services/userServices';
import { getServerSession } from 'next-auth';

const EditMyPage = async () => {
  const session = await getServerSession(authConfig);
  const { user, error } = await getSingleUser(session?.user.id!, 'myself');

  console.log(`edit my page user:`, user);

  if (!user && error) {
    <p>Error{error}</p>;
  }

  return (
    <div>
      <h1>Edit my Profile</h1>
      <EditMyInfoForm
        username={user?.username}
        image={user?.image}
        job={user?.job}
        instagram={user?.socials?.instagram}
        facebook={user?.socials?.facebook}
        twitter={user?.socials?.twitter}
        youtube={user?.socials?.youtube}
        status={user?.status}
      />
    </div>
  );
};

export default EditMyPage;
