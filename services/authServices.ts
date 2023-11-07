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
      throw new Error('ERROR!!!!');
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
