import BlogpostsContainer from '@/app/components/Blogposts/BlogpostsContainer';
import UserInfo from '@/app/components/Users/UserInfo';
import Search from '@/app/components/common/Search';
import Pagination from '@/app/components/ui/Pagination';
import BlogpostsLoadingSkeleton from '@/app/components/ui/skeletons/BlogpostsLoadingSkeleton';
import { authConfig } from '@/configs/auth';
import { getSingleUser } from '@/services/userServices';
import { BlogpostTags } from '@/types/blogTypes';
import { RequestTags, SearchQueriesNames } from '@/types/requestTypes';
import { generateBlogSearchOptions } from '@/utils/generateBlogSearchOptions';
import { getServerSession } from 'next-auth';
import { FC, Suspense } from 'react';

interface Props {
  params: {
    userId: string;
  };
  searchParams?: {
    page?: string;
    blogpostsSearchQuery?: string;
    blogpostsTagFilter?: string;
  };
}

const UserPage: FC<Props> = async ({ params: { userId }, searchParams }) => {
  const [session, { user, error }] = await Promise.all([
    await getServerSession(authConfig),
    await getSingleUser(userId, RequestTags.GET_SINGLE_USER),
  ]);

  if (error) {
    return <p>{error}</p>;
  }

  const { currentPage, query, tagFilter, totalPages } =
    await generateBlogSearchOptions({
      blogpostsSearchQuery: searchParams?.blogpostsSearchQuery,
      page: searchParams?.page,
      blogpostsTagFilter: searchParams?.blogpostsTagFilter,
      userId: user?._id,
    });

  return (
    <section>
      <UserInfo user={user} />

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
          knownOwner={user}
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

export default UserPage;
