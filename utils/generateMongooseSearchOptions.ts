import { NextRequest } from 'next/server';

export const generateMongooseSearchOptions = (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const usersSearchQuery = searchParams.get('usersSearchQuery');
  const blogpostsSearchQuery = searchParams.get('blogpostsSearchQuery');
  const blogpostsTagFilter = searchParams.get('blogpostsTagFilter');
  let searchOptions;

  if (usersSearchQuery) {
    searchOptions = { username: { $regex: usersSearchQuery, $options: 'i' } };
  } else if (blogpostsSearchQuery) {
    searchOptions = { title: { $regex: blogpostsSearchQuery, $options: 'i' } };
  } else if (blogpostsTagFilter) { //! Будет ли эта строка работать??
    searchOptions = { tag: { $regex: blogpostsTagFilter, $options: 'i' } };
  } else if (blogpostsSearchQuery && blogpostsTagFilter) {
    searchOptions = {
      tag: { $regex: blogpostsTagFilter, $options: 'i' },
      title: { $regex: blogpostsSearchQuery, $options: 'i' },
    };
  } else {
    searchOptions = {};
  }

  return searchOptions;
};
