import { IResetPasswordUser } from "@/types/authTypes";

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

export const verifyPasswordResetToken = async (resetToken: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/verifyToken`, {
      method: 'POST',
      body: JSON.stringify({
        token: resetToken,
      }),
    });

    if (response.status === 400) {
      console.log(response);

      return {
        errMsg: 'Invalid token or token has expired',
      };
    }

    if (!response.ok) {
      console.log(response);

      return {
        errMsg: 'Something went wrong! Try again later!',
      };
    }

    const data = await response.json();

    return {
      user: data as IResetPasswordUser,
    };
  } catch (error) {
    console.error(error);

    return {
      errMsg: 'Something went wrong! Try again later!',
    };
  }
};
