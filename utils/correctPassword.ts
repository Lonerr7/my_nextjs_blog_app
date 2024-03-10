import bcrypt from 'bcrypt';

export const correctPassword = async ({
  candidatePassword,
  userPassword,
}: {
  candidatePassword: string;
  userPassword: string;
}) => await bcrypt.compare(candidatePassword, userPassword);
