import { USERS_ITEMS_PER_PAGE } from '@/configs/requestConfig';
import { IUser } from '@/types/userTypes';
import { unstable_noStore as noStore } from 'next/cache';

export const getUsers = async (query: string, page: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/users?query=${query}&page=${page}`,
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
      `${process.env.NEXTAUTH_URL}/api/usersDocsNumber?query=${query}`
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
  tag: 'myself' | 'user',
  populateBlogs?: boolean
) => {
  try {
    noStore();
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/singleUser?id=${userId}&populateBlogs=${populateBlogs}`,
      { next: { tags: [tag] } }
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
