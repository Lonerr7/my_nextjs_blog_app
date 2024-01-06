import { SearchQueriesNames } from '@/types/requestTypes';
import { NextRequest } from 'next/server';

export const generateMongooseSearchOptions = (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const usersSearchQuery = searchParams.get(
    SearchQueriesNames.USERS_SEARCH_QUERY
  );
  const blogpostsSearchQuery = searchParams.get(
    SearchQueriesNames.BLOGPOSTS_SEARCH_QUERY
  );
  const blogpostsTagFilter = searchParams.get(
    SearchQueriesNames.BLOGPOSTS_TAG_FILTER
  );
  let searchOptions;

  if (usersSearchQuery) {
    searchOptions = { username: { $regex: usersSearchQuery, $options: 'i' } };
  } else if (blogpostsSearchQuery && blogpostsTagFilter) {
    //! Будет ли эта строка работать??
    searchOptions = {
      tag: { $regex: blogpostsTagFilter, $options: 'i' },
      title: { $regex: blogpostsSearchQuery, $options: 'i' },
    };
  } else if (blogpostsSearchQuery) {
    searchOptions = { title: { $regex: blogpostsSearchQuery, $options: 'i' } };
  } else if (blogpostsTagFilter) {
    searchOptions = { tag: { $regex: blogpostsTagFilter, $options: 'i' } };
  } else {
    searchOptions = {};
  }

  return searchOptions;
};
