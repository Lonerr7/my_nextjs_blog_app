import EditMyInfoForm from '@/app/components/my-page/EditMyInfoForm';
import EditMyInfoNav from '@/app/components/my-page/EditMyInfoNav';
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
    <section>
      <h1 className="page-title">Edit my Profile</h1>
      <EditMyInfoForm
        username={user?.username}
        job={user?.job}
        instagram={user?.socials?.instagram}
        facebook={user?.socials?.facebook}
        twitter={user?.socials?.twitter}
        youtube={user?.socials?.youtube}
        status={user?.status}
      />
    </section>
  );
};

export default EditMyPage;
