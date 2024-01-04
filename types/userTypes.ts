import { IBlogPost } from './blogTypes';

export interface IUser {
  _id: string;
  username: string;
  address?: string;
  socials?: UserSocials;
  status?: string;
  image?: IImage;
  job?: string;
  blogs?: IBlogPost[];
}

export interface IImage {
  imageUrl: string;
  publicId: string;
}

export interface UserSocials {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
}
