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
        // Checking if its mongoose error => passing it to catch block
        if (error.errors.username) {
          throw new Error(error.errors.username.message);
        } else if (error.errors.passwordConfirm) {
          throw new Error(error.errors.passwordConfirm.message);
        }
      }
      // else {
      //   throw new Error(error.message);
      // }
    }

    const user = await response.json();
    return { user };
  } catch (error: any) {
    return { error: error.message };
  }
};
