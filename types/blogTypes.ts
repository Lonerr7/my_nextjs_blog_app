export interface CreateBlogInput {
  userId: string;
  body: {
    tag: string; //!
    image: string;
    text: string;
  };
}

export interface CreateBlogApiRouteInput {
  tag: string; //!
  image: string;
  text: string;
}

export interface IBlogPost {
  owner: string;
  tag: string; //!
  image: string;
  text: string;
}
