export const registerUser = async ({
  username,
  email,
  password,
  passwordConfirm,
}: {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
        passwordConfirm,
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      if (error?.errors) {
        throw new Error(error.errors.passwordConfirm.message);
      } else {
        throw new Error(error.message);
      }
    }

    return { user: await response.json() };
  } catch (error: any) {
    return { error: error.message };
  }
};
