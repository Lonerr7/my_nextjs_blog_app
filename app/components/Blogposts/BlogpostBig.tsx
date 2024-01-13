import { IBlogPost } from '@/types/blogTypes';
import BlogpostTagBig from './BlogpostTagBig';
import NextImageVithViewer from '../Users/NextImageVithViewer';

interface Props {
  blogpost?: IBlogPost;
}

const BlogpostBig: React.FC<Props> = ({ blogpost }) => {
  if (!blogpost) {
    return null;
  }

  return (
    <div>
      <BlogpostTagBig tag={blogpost.tag} />
      <h1>{blogpost.title}</h1>

      <div className="flex align-center justify-between">
        <div>OWNER</div>
        <div>CREATED AT</div>
        <div>Last Updated at if updated</div>
      </div>

      <NextImageVithViewer
        customClassName="!min-w-[100%] min-h-[100%] !max-w-[800px] !max-h-[462px]"
        customImgClassName="!h-[auto] !w-[auto]"
        fullscreen
        imageUrl={blogpost.image.imageUrl}
        sizes="100vw"
      />

      <p>{blogpost.text}</p>
    </div>
  );
};

export default BlogpostBig;
