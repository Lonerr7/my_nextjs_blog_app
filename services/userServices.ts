import { USERS_ITEMS_PER_PAGE, requestURL } from '@/configs/requestConfig';
import { RequestTags, SearchQueriesNames } from '@/types/requestTypes';
import { IUser } from '@/types/userTypes';
import { unstable_noStore as noStore } from 'next/cache';

export const getUsers = async (query: string, page: number) => {
  try {
    const response = await fetch(
      `${requestURL}/api/users?${SearchQueriesNames.USERS_SEARCH_QUERY}=${query}&page=${page}`,
      {
        next: {
          revalidate: 15,
          tags: ['getUsers'],
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data as IUser[];
  } catch (error: any) {
    console.log(error);

    return 'Error when fetching';
  }
};

export const getUsersPages = async (query: string) => {
  try {
    noStore();
    const response = await fetch(
      `${requestURL}/api/usersDocsNumber?${SearchQueriesNames.USERS_SEARCH_QUERY}=${query}`
    );

    const data: number = await response.json();

    return Math.ceil(data / USERS_ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of users');
  }
};

export const getSingleUser = async (
  userId: string | undefined,
  tag: RequestTags.GET_SINGLE_USER | RequestTags.GET_ME,
  populateBlogs?: boolean
) => {
  try {
    noStore();
    const response = await fetch(
      `${requestURL}/api/singleUser?id=${userId}&populateBlogs=${populateBlogs}`,
      { next: { revalidate: 0 } }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(`ERROR`, data);

      throw new Error('Error when fetching a user');
    }

    return {
      user: data as IUser,
    };
  } catch (error: any) {
    console.log(error);

    return {
      error: error.message as string,
    };
  }
};
