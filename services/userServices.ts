import { IUser } from '@/types/userTypes';
import { unstable_noStore as noStore } from 'next/cache';

export const getUsers = async (query: string) => {
  try {
    noStore();
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/users?query=${query}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data as IUser[];
  } catch (error: any) {
    return 'Error when fetching';
  }
};

const ITEMS_PER_PAGE = 6;
export const getUsersPages = async (query: string) => {
  try {
    noStore();
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/usersDocsNumber?query=${query}`
    );

    const data: number = await response.json();

    return Math.ceil(data / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of users');
  }
};
