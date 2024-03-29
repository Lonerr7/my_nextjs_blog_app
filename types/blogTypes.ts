import { IImage, ILikedUser, IUser } from './userTypes';

export interface CreateBlogInput {
  userId: string;
  body: {
    tag: BlogpostTags | '';
    image: string;
    text: string;
    title: string;
  };
}

export interface CreateBlogApiRouteInput {
  tag: BlogpostTags;
  image: string;
  text: string;
  title: string;
}

export interface IBlogPost {
  _id: string;
  owner: IUser; //! Возможно уберем несколько полей при популировании данных
  tag: BlogpostTags;
  image: IImage;
  text: string;
  createdAt: string;
  title: string;
  lastUpdatedAt?: string;
  commentsCount: number;
  likes: string[];
}

export interface BlogpostLikes {
  [key: string]: string;
}

export type IBlogpostLikedUsers = ILikedUser[];

export type ISmBlogpost = Omit<IBlogPost, 'text' | 'lastUpdatedAt'>;

export interface SelectOption {
  label: BlogpostTags;
  value: BlogpostTags;
}

export enum BlogpostTags {
  SPORT = 'Sport',
  MUSIC = 'Music',
  TRAVELLING = 'Travelling',
  MOVIES = 'Movies',
  IT = 'IT',
  LANGUAGES = 'Languages',
  TECHNOLOGY = 'Technology',
  LIFESTYLE = 'Lifestyle',
}
