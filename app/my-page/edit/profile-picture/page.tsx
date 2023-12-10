import EditMyProfilePicForm from '@/app/components/my-page/EditMyProfilePicForm';

const UpdateMyProfilePicPage = async () => {
  return (
    <section className="flex flex-col items-center">
      <h1 className="page-title">Update your profile picture</h1>
      <EditMyProfilePicForm />
    </section>
  );
};

export default UpdateMyProfilePicPage;
