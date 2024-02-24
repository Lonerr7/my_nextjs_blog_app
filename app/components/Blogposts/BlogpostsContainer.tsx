import { getBlogposts } from '@/services/blogServices';
import { addBlurredDataUrls } from '@/utils/getBase64';
import Blogposts from './Blogposts';
import { IUser } from '@/types/userTypes';
import { BlogpostTags } from '@/types/blogTypes';

interface Props {
  knownOwner?: IUser;
  queryOptions?: {
    query?: string;
    currentPage?: number;
    blogpostTagFilter?: BlogpostTags;
  };
  mySessionId: string;
  noTitle?: boolean;
}

const BlogpostsContainer: React.FC<Props> = async ({
  knownOwner,
  queryOptions,
  mySessionId,
  noTitle,
}) => {
  const { blogs: blogposts, errMsg } = await getBlogposts(knownOwner?._id, {
    blogpostTagFilter: queryOptions?.blogpostTagFilter,
    page: queryOptions?.currentPage,
    query: queryOptions?.query,
  });

  if (errMsg) {
    return <p>Error: {errMsg}</p>;
  }

  const blurredUrls = await addBlurredDataUrls(
    blogposts && blogposts.map((blogpost) => blogpost?.image?.imageUrl)
  );

  return (
    <Blogposts
      knownOwner={knownOwner}
      mySessionId={mySessionId}
      noTitle={noTitle}
      blogposts={blogposts}
      blurredUrls={blurredUrls}
    />
  );
};

export default BlogpostsContainer;
