import { Metadata } from 'next';
import { FC, Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import { getSingleUser } from '@/services/userServices';
import UserInfo from '../components/Users/UserInfo';
import UserBlogposts from '../components/Blogposts/Blogposts';
import { RequestTags, SearchQueriesNames } from '@/types/requestTypes';
import { getBlogpostsPages } from '@/services/blogServices';
import Search from '../components/common/Search';
import { BlogpostTags } from '@/types/blogTypes';
import Pagination from '../components/ui/Pagination';
import BlogpostsLoadingSkeleton from '../components/ui/skeletons/BlogpostsLoadingSkeleton';

export const metadata: Metadata = {
  title: 'My Page | Meta Blog',
};

interface Props {
  searchParams?: {
    page?: string;
    blogpostsSearchQuery?: string;
    blogpostsTagFilter?: string;
  };
}

const MyPage: FC<Props> = async ({ searchParams }) => {
  const session = await getServerSession(authConfig);
  const { user: myself, error } = await getSingleUser(
    session?.user.id!,
    RequestTags.GET_ME,
    false
  );

  const query = searchParams?.blogpostsSearchQuery || '';
  const currentPage = Number(searchParams?.page) || 1;
  const tagFilter = searchParams?.blogpostsTagFilter || '';
  const totalPages = await getBlogpostsPages(query, tagFilter, myself?._id);

  console.log(totalPages);

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section>
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
        <UserBlogposts
          myselfOwner={myself}
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

export default MyPage;
