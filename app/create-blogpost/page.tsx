import CreateBlogPostContainer from '../components/CreateBlogPost/CreateBlogPostContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create blogpost | Meta Blog',
};

const CreateBlogPostPage = () => {
  return (
    <section>
      <h1 className="page-title">Create Blogpost</h1>
      <CreateBlogPostContainer />
    </section>
  );
};

export default CreateBlogPostPage;
