import { NextRequest } from 'next/server';

export const generateMongooseSearchOptions = (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('query');
  let searchOptions;

  if (query) {
    searchOptions = { username: { $regex: query, $options: 'i' } };
  } else {
    searchOptions = {};
  }

  return searchOptions;
};
