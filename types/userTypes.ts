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

export type ILikedUser = Pick<IUser, '_id' | 'username' | 'status' | 'image'>;

export enum RegisterUserInputFields {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_CONFIRM = 'passwordConfirm',
}
