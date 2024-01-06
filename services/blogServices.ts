import { BLOGS_ITEMS_PER_PAGE } from '@/configs/requestConfig';
import { BlogpostTags, CreateBlogInput, IBlogPost } from '@/types/blogTypes';
import { RequestTags, SearchQueriesNames } from '@/types/requestTypes';
import { getBase64Size } from '@/utils/getBase64StringSize';
import { unstable_noStore as no_store } from 'next/cache';
import { z } from 'zod';

const MAX_FILE_SIZE_IN_KB = 2048;

const UploadBlogPostSchema = z.object({
  image: z
    .string()
    .refine(
      (base64Image) => base64Image.startsWith('data:image'),
      'Only images are allowed!'
    )
    .refine(
      (base64Image) => getBase64Size(base64Image, true) <= MAX_FILE_SIZE_IN_KB,
      `Max image size is 2MB.`
    ),
  tag: z.nativeEnum(BlogpostTags, {
    errorMap: () => ({
      message: 'Please, select a blogpost tag',
    }),
  }),
  text: z
    .string({ required_error: 'Blogpost text is required!' })
    .min(1, 'Please, enter text for your blogpost!')
    .max(1000, 'Blogpost cannot be more than 1000 characters')
    .refine(
      (textValue) => textValue.replace(/<(.|\n)*?>/g, '').trim().length !== 0,
      'Blogpost cannot be empty!'
    ),
  userId: z.string(),
  title: z
    .string()
    .min(3, 'Title should be at least 3 characters')
    .max(125, "Title shouldn't be more than 125 characters"),
});

export const createBlogpost = async ({
  userId,
  body: { tag, image, text, title },
}: CreateBlogInput) => {
  try {
    const validatedUserInput = UploadBlogPostSchema.safeParse({
      tag,
      image,
      text,
      userId,
      title,
    });

    // Валидируем инпут
    if (!validatedUserInput.success) {
      return {
        errMsg: validatedUserInput.error.issues[0].message,
        success: null,
      };
    }

    const response = await fetch(
      `http://localhost:3000/api/blogs?userId=${validatedUserInput.data.userId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          tag: validatedUserInput.data.tag,
          image: validatedUserInput.data.image,
          text: validatedUserInput.data.text,
          title: validatedUserInput.data.title,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      if (data.error?.errMsg) {
        return { errMsg: data.error.errMsg as string, success: null };
      }

      return {
        errMsg: 'Something went wrong! Try again later!',
        success: null,
      };
    }

    return {
      errMsg: null,
      success: 'Successfully created a new blogpost!',
    };
  } catch (error) {
    console.error(error);

    return {
      errMsg: 'Something went wrong! Try again later!',
      success: null,
    };
  }
};

export const getBlogposts = async (
  ownerId: string | undefined,
  {
    page,
    blogpostTagFilter,
    query,
  }: { page?: number; blogpostTagFilter?: BlogpostTags; query?: string }
) => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/blogs?ownerId=${ownerId}&${SearchQueriesNames.BLOGPOSTS_SEARCH_QUERY}=${query}&page=${page}&${SearchQueriesNames.BLOGPOSTS_TAG_FILTER}=${blogpostTagFilter}`,
      {
        next: {
          tags: [RequestTags.GET_BLOGPOSTS],
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return {
      blogs: data as IBlogPost[],
    };
  } catch (error: any) {
    console.log(error);

    return {
      errMsg: 'Error when fetching',
    };
  }
};

export const getBlogpostsPages = async (
  query?: string,
  tagFilter?: string,
  owner?: string
) => {
  try {
    no_store();
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/blogpostsPageCount?${SearchQueriesNames.BLOGPOSTS_SEARCH_QUERY}=${query}&${SearchQueriesNames.BLOGPOSTS_TAG_FILTER}=${tagFilter}&owner=${owner}`
    );

    const data: number = await response.json();

    return Math.ceil(data / BLOGS_ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of users');
  }
};
