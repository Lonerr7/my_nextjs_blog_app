import { authConfig } from '@/configs/auth';
import { getServerSession } from 'next-auth';
import { generateBlogSearchOptions } from '@/utils/generateBlogSearchOptions';
import Search from '../components/common/Search';
import { SearchQueriesNames } from '@/types/requestTypes';
import { BlogpostTags } from '@/types/blogTypes';
import { Suspense } from 'react';
import BlogpostsLoadingSkeleton from '../components/ui/skeletons/blogposts/BlogpostsLoadingSkeleton';
import Pagination from '../components/ui/Pagination';
import BlogpostsContainer from '../components/Blogposts/BlogpostsContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogposts | Meta Blog',
  description: 'The page with all blogposts created by users',
};

interface Props {
  searchParams?: {
    page?: string;
    blogpostsSearchQuery?: string;
    blogpostsTagFilter?: string;
  };
}

const BlogpostsPage: React.FC<Props> = async ({ searchParams }) => {
  const session = await getServerSession(authConfig);

  const { currentPage, query, tagFilter, totalPages } =
    await generateBlogSearchOptions({
      blogpostsSearchQuery: searchParams?.blogpostsSearchQuery,
      page: searchParams?.page,
      blogpostsTagFilter: searchParams?.blogpostsTagFilter,
    });

  return (
    <section>
      <h1 className="page-title">Recent blogposts</h1>
      <Search
        palceholder="Search by blogpost title"
        queryToChange={SearchQueriesNames.BLOGPOSTS_SEARCH_QUERY}
        blogpostsTagFilter={tagFilter as BlogpostTags}
      />
      <Suspense
        key={query + currentPage + tagFilter}
        fallback={<BlogpostsLoadingSkeleton />}
      >
        <BlogpostsContainer
          mySessionId={session?.user.id!}
          queryOptions={{
            blogpostTagFilter: tagFilter as BlogpostTags,
            currentPage: currentPage,
            query,
          }}
          noTitle
        />
      </Suspense>
      <Pagination
        totalPages={totalPages}
        wrapperClassName="flex justify-center mt-5"
      />
    </section>
  );
};

export default BlogpostsPage;
