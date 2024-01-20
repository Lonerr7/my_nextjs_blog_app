import Link from 'next/link';
import { LuPencil } from 'react-icons/lu';
import DeleteBlogpost from './DeleteBlogpost';

interface Props {
  customClassName?: string;
  blogpostId: string;
  iconSize?: number;
  deleteIconSize?: number;
  withRedirect?: boolean;
  deleteOptimisticBlogpost?: (action: unknown) => void;
}

const BlogpostControls: React.FC<Props> = ({
  customClassName,
  blogpostId,
  iconSize,
  deleteIconSize,
  withRedirect,
  deleteOptimisticBlogpost,
}) => {
  return (
    <div
      className={`w-[15%] flex justify-between items-center ${customClassName}`}
    >
      <Link
        className="inline-block mr-1"
        href={`/blogposts/${blogpostId}/edit`}
      >
        <LuPencil className="dark:text-light-gray" size={iconSize || 18} />
      </Link>
      <DeleteBlogpost
        blogpostId={blogpostId}
        iconSize={deleteIconSize}
        withRedirect={withRedirect}
        deleteOptimisticBlogpost={deleteOptimisticBlogpost}
      />
    </div>
  );
};

export default BlogpostControls;
