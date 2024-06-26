import { Metadata } from 'next';
import { FC, Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import { getSingleUser } from '@/services/userServices';
import UserInfo from './components/Users/UserInfo';
import { RequestTags, SearchQueriesNames } from '@/types/requestTypes';
import Search from './components/common/Search';
import { BlogpostTags } from '@/types/blogTypes';
import Pagination from './components/ui/Pagination';
import BlogpostsLoadingSkeleton from './components/ui/skeletons/blogposts/BlogpostsLoadingSkeleton';
import { generateBlogSearchOptions } from '@/utils/generateBlogSearchOptions';
import BlogpostsContainer from './components/Blogposts/BlogpostsContainer';

export const metadata: Metadata = {
  title: 'My Page | Meta Blog',
  description: 'The main page of the application',
};

interface Props {
  searchParams?: {
    page?: string;
    blogpostsSearchQuery?: string;
    blogpostsTagFilter?: string;
  };
}

const Home: FC<Props> = async ({ searchParams }) => {
  const session = await getServerSession(authConfig);
  console.log(session);

  const { user: myself, error } = await getSingleUser(
    session?.user.id!,
    RequestTags.GET_ME,
    false
  );

  const { currentPage, query, tagFilter, totalPages } =
    await generateBlogSearchOptions({
      blogpostsSearchQuery: searchParams?.blogpostsSearchQuery,
      page: searchParams?.page,
      blogpostsTagFilter: searchParams?.blogpostsTagFilter,
      userId: myself?._id,
    });

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="relative">
      <UserInfo user={myself} isMyPage />

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
          knownOwner={myself}
          mySessionId={session?.user.id!}
          queryOptions={{
            blogpostTagFilter: tagFilter as BlogpostTags,
            currentPage: currentPage,
            query,
          }}
        />
      </Suspense>

      <Pagination
        totalPages={totalPages}
        wrapperClassName="flex justify-center mt-5"
      />
    </section>
  );
};

export default Home;
