import DeleteMyProfileForm from '@/app/components/my-page/DeleteMyProfileForm';
import DeleteMyPageSkeleton from '@/app/components/ui/skeletons/my-page/edit/DeleteMyPageSkeleton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete my profile | Meta Blog',
  description: 'The page where you can delete your profile',
};

const DeleteMyProfilePage = () => {
  return (
    <section className="relative grow">
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
