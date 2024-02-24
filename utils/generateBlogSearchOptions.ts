import { getBlogpostsPages } from '@/services/blogServices';

interface Params {
  blogpostsSearchQuery?: string;
  page?: string;
  blogpostsTagFilter?: string;
  userId?: string;
}

export const generateBlogSearchOptions = async ({
  blogpostsSearchQuery,
  page,
  blogpostsTagFilter,
  userId,
}: Params) => {
  const query = blogpostsSearchQuery || '';
  const currentPage = Number(page) || 1;
  const tagFilter = blogpostsTagFilter || '';
  const totalPages = await getBlogpostsPages(query, tagFilter, userId);

  return {
    query,
    currentPage,
    tagFilter,
    totalPages,
  };
};
