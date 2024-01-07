import { authConfig } from '@/configs/auth';
import { getServerSession } from 'next-auth';
import Blogposts from '../components/Blogposts/Blogposts';
import { generateBlogSearchOptions } from '@/utils/generateBlogSearchOptions';
import Search from '../components/common/Search';
import { SearchQueriesNames } from '@/types/requestTypes';
import { BlogpostTags } from '@/types/blogTypes';
import { Suspense } from 'react';
import BlogpostsLoadingSkeleton from '../components/ui/skeletons/BlogpostsLoadingSkeleton';
import Pagination from '../components/ui/Pagination';

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
        <Blogposts
          mySessionId={session?.user.id}
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
