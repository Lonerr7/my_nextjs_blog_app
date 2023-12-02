export const handleServerActionError = (error: any) => {
  console.error(error);

  if (error?.errors?.username) {
    return {
      message: error.errors.username.message,
    };
  } else if (error?.errors?.job) {
    return {
      message: error.errors.job.message,
    };
  } else if (error?.errors?.status) {
    return {
      message: error.errors.status.message,
    };
  } else if (error?.errors['socials.instagram']) {
    return {
      message: error.errors['socials.instagram'].message,
    };
  } else if (error?.errors['socials.facebook']) {
    return {
      message: `${error.errors['socials.facebook'].message}`,
    };
  } else if (error?.errors['socials.youtube']) {
    return {
      message: error.errors['socials.youtube'].message,
    };
  } else if (error?.errors['socials.twitter']) {
    return {
      message: error.errors['socials.twitter'].message,
    };
  } else {
    console.error(error);
    return {
      message: 'Error when updating a user!',
    };
  }
};
