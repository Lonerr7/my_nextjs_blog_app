'use server';

import { z } from 'zod';

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'Password should be at least 6 characters')
    .max(25, "Password shouldn't be more than 25 characters"),
  passwordConfirm: z
    .string()
    .min(6, 'Password should be at least 6 characters')
    .max(25, "Password shouldn't be more than 25 characters"),
});

export const resetPassword = async (userId: string, formData: FormData) => {
  const unvalidatedInputValues = {
    password: formData.get('password'),
    passwordConfirm: formData.get('passwordConfirm'),
  };

  // Validating input fields before sendning a request to DB
  const validatedFields = resetPasswordSchema.safeParse(unvalidatedInputValues);

  if (!validatedFields.success) {
    return {
      errMessage: validatedFields.error.issues[0].message,
    };
  }
};
