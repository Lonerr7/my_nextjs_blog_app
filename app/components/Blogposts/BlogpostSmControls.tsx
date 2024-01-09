import Link from 'next/link';
import { LuPencil } from 'react-icons/lu';
import DeleteBlogpost from './DeleteBlogpost';

interface Props {
  blogpostId: string;
  deleteOptimisticBlogpost: (action: unknown) => void;
}

const BlogpostSmControls: React.FC<Props> = ({
  blogpostId,
  deleteOptimisticBlogpost,
}) => {
  return (
    <div className="w-[15%] flex justify-between items-center">
      <Link
        className="inline-block mr-1"
        href={`/blogposts/${blogpostId}/edit`}
      >
        <LuPencil className="dark:text-light-gray" size={18} />
      </Link>
      <DeleteBlogpost
        blogpostId={blogpostId}
        deleteOptimisticBlogpost={deleteOptimisticBlogpost}
      />
    </div>
  );
};

export default BlogpostSmControls;
