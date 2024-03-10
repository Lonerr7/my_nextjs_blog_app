import EditMyInfoForm from '@/app/components/my-page/EditMyInfoForm';
import { authConfig } from '@/configs/auth';
import { getSingleUser } from '@/services/userServices';
import { RequestTags } from '@/types/requestTypes';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: 'Edit my page | Meta Blog',
  description: 'The page where you can edit your general profile information',
};

const EditMyPage = async () => {
  const session = await getServerSession(authConfig);
  const { user, error } = await getSingleUser(
    session?.user.id!,
    RequestTags.GET_ME
  );

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
