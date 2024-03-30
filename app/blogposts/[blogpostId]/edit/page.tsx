import EditBlogpostContainer from '@/app/components/EditBlogpost/EditBlogpostContainer';
import { authConfig } from '@/configs/auth';
import { getSingleBlogpost } from '@/services/blogServices';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    blogpostId: string;
  };
}

const EditBlogpostPage: React.FC<Props> = async ({
  params: { blogpostId },
}) => {
  const { blogpost, errMsg } = await getSingleBlogpost(blogpostId);
  const session = await getServerSession(authConfig);

  // Если наш id не совпадает с id овнера блогпоста - делаем редирект из этой страницы
  if (session?.user.id !== blogpost?.owner._id) {
    redirect('/my-page');
  }

  if (errMsg) {
    return <p>{errMsg}</p>;
  }

  return (
    <section>
      <h1 className="page-title">Edit Blogpost</h1>
      <EditBlogpostContainer blogpost={blogpost!} />
    </section>
  );
};

export default EditBlogpostPage;
