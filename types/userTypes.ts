export interface IUser {
  _id: string;
  username: string;
  address?: string;
  socials: UserSocials;
}

export interface UserSocials {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
}
