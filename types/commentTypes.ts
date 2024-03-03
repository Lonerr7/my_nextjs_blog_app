import { ILikedUser } from './userTypes';

export interface IComment {
  _id: string;
  text: string;
  to: string;
  owner: ILikedUser;
  createdAt: string;
  lastUpadatedAt?: string;
  likes: CommentLikes;
}

interface CommentLikes {
  [key: string]: boolean;
}
