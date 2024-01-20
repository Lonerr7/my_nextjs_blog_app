import { sanitize } from 'isomorphic-dompurify';

interface Props {
  dirtyText: string;
  customClassName?: string;
}

const BlogpostCleanText: React.FC<Props> = ({ dirtyText, customClassName }) => {
  const sanitizedBlogpostText = sanitize(dirtyText);

  return (
    <div
      className={customClassName}
      dangerouslySetInnerHTML={{ __html: sanitizedBlogpostText }}
    ></div>
  );
};

export default BlogpostCleanText;
