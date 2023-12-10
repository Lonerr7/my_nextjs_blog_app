import EditMyProfilePicForm from '@/app/components/my-page/EditMyProfilePicForm';
import { authConfig } from '@/configs/auth';
import { getSingleUser } from '@/services/userServices';
import { getServerSession } from 'next-auth';

const UpdateMyProfilePicPage = async () => {
  const session = await getServerSession(authConfig);
  const { user: myself } = await getSingleUser(session?.user.id, 'myself');

  return (
    <section className="flex flex-col items-center">
      <h1 className="page-title">Update your profile picture</h1>
      <EditMyProfilePicForm myPicture={myself?.image?.imageUrl} />
    </section>
  );
};

export default UpdateMyProfilePicPage;
