import { IBlogPost } from './blogTypes';

export interface IUser {
  _id: string;
  username: string;
  address?: string;
  socials?: UserSocials;
  status?: string;
  image?: {
    imageUrl?: string;
    publicId?: string;
  };
  job?: string;
  blogs?: IBlogPost[];
}

export interface UserSocials {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
}
