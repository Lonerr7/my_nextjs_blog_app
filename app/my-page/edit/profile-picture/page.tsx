import DeleteMyAvatarForm from '@/app/components/my-page/DeleteMyAvatarForm';
import EditMyProfilePicForm from '@/app/components/my-page/EditMyProfilePicForm';

const UpdateMyProfilePicPage = async () => {
  return (
    <section className="relative">
      <h1 className="page-title">Update your profile picture</h1>
      <div className="mb-4 flex flex-col items-center">
        <h2 className="page-subtitle">Change my profile picture</h2>
        <EditMyProfilePicForm />
      </div>
      <div className="mb-4 flex flex-col items-center">
        <h2 className="page-subtitle">Delete your profile picture</h2>
        <DeleteMyAvatarForm />
      </div>
    </section>
  );
};

export default UpdateMyProfilePicPage;
