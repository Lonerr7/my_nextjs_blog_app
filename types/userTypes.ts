export interface IUser {
  _id: string;
  username: string;
  address?: string;
  socials: UserSocials;
  status?: string;
  image?: string;
}

export interface UserSocials {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
}
