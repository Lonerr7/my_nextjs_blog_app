import bcrypt from 'bcrypt';

export const comparePassword = async (
  candidatePassword: string,
  userPassword: string
) => {
  return bcrypt.compare(candidatePassword, userPassword);
};
