import DeleteMyProfileForm from '@/app/components/my-page/DeleteMyProfileForm';

const DeleteMyProfilePage = () => {
  return (
    <section className="relative">
      <h1 className="page-title">Delete your profile</h1>
      <p className="text-center text-lg mb-6">
        Do you really want to delete your profile? Your profile will be deleted
        forever!
      </p>
      <div className="flex justify-center">
        <DeleteMyProfileForm />
      </div>
    </section>
  );
};

export default DeleteMyProfilePage;
