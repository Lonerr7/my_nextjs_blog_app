'use client';

import { deleteBlogpost } from '@/actions/deleteBlogpost';
import { MdDelete } from 'react-icons/md';

interface Props {
  isMine?: boolean;
  blogpostId: string;
}

const DeleteBlogpost: React.FC<Props> = ({ isMine, blogpostId }) => {
  const bindedAction = deleteBlogpost.bind(null, blogpostId);

  const clientAction = async (formData: FormData) => {
    
  };

  return (
    <>
      {isMine ? (
        <button type="button" title="Delete Blogpost">
          <MdDelete
            className="transition delay-30ms text-red-500 hover:text-red-700"
            size={24}
          />
        </button>
      ) : null}
    </>
  );
};

export default DeleteBlogpost;
