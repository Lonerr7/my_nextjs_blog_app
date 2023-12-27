import { CreateBlogInput } from '@/types/blogTypes';
import { getBase64Size } from '@/utils/getBase64StringSize';
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
  tag: z.string({ required_error: 'Blogpost tag is required!' }), // !
  text: z
    .string({ required_error: 'Blogpost text is required!' })
    .min(1, 'Please, enter text for your blogpost!')
    .max(1000, 'Blogpost cannot be more than 1000 characters')
    .refine(
      (textValue) => textValue.replace(/<(.|\n)*?>/g, '').trim().length !== 0,
      'Blogpost cannot be empty!'
    ),
  userId: z.string(),
});

export const createBlogpost = async ({
  userId,
  body: { tag, image, text },
}: CreateBlogInput) => {
  try {
    const validatedUserInput = UploadBlogPostSchema.safeParse({
      tag,
      image,
      text,
      userId,
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
