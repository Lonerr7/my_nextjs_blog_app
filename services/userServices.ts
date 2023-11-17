import { IUser } from '@/types/userTypes';

export const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      next: {
        revalidate: 15,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data as IUser[];
  } catch (error: any) {
    return 'Error when fetching';
  }
};
