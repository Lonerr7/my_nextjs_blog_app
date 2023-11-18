import { IUser } from '@/types/userTypes';
import { unstable_noStore as noStore } from 'next/cache';

export const getUsers = async (query: string) => {
  try {
    noStore();
    const response = await fetch(
      `http://localhost:3000/api/users?query=${query}`
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
