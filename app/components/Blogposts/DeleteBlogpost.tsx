'use client';

import { deleteBlogpost } from '@/actions/deleteBlogpost';
import { toast } from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

interface Props {
  isMine?: boolean;
  blogpostId: string;
  deleteOptimisticBlogpost: (action: unknown) => void;
}

const DeleteBlogpost: React.FC<Props> = ({
  isMine,
  blogpostId,
  deleteOptimisticBlogpost,
}) => {
  const bindedAction = deleteBlogpost.bind(null, blogpostId);

  const clientAction = async () => {
    deleteOptimisticBlogpost(blogpostId);
    const { errMsg, success } = await bindedAction();

    if (errMsg) {
      toast.error(errMsg);
      return;
    }

    // If success
    if (success) {
      toast.success('Sucessfully deleted blogpost!');
    }
  };

  return (
    <>
      {isMine ? (
        <form action={clientAction}>
          <button type="submit" title="Delete Blogpost">
            <MdDelete
              className="transition delay-30ms text-red-500 hover:text-red-700"
              size={24}
            />
          </button>
        </form>
      ) : null}
    </>
  );
};

export default DeleteBlogpost;
