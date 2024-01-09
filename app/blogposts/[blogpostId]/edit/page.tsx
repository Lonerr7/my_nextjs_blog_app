import EditBlogpostContainer from '@/app/components/EditBlogpost/EditBlogpostContainer';
import { getSingleBlogpost } from '@/services/blogServices';

interface Props {
  params: {
    blogpostId: string;
  };
}

const EditBlogpostPage: React.FC<Props> = async ({
  params: { blogpostId },
}) => {
  const { blogpost, errMsg } = await getSingleBlogpost(blogpostId);

  if (errMsg) {
    return <p>{errMsg}</p>;
  }

  return <EditBlogpostContainer blogpost={blogpost!} />;
};

export default EditBlogpostPage;
