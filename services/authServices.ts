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

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      // Checking if its mongoose error
      if (data?.errors) {
        if (data.errors.username) {
          throw new Error(data.errors.username.message);
        } else if (data.errors.passwordConfirm) {
          throw new Error(data.errors.passwordConfirm.message);
        } else if (data.errors.password) {
          throw new Error(data.errors.password.message);
        }
      } else {
        // if User exists we come here (we throw our custom error in api route)
        throw new Error(data.message);
      }
    }

    return { user: data };
  } catch (error: any) {
    return { error: error.message };
  }
};
