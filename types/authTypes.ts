export interface LoginFormState {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface RegisterFormState extends LoginFormState {
  username: string;
}

export interface IResetPasswordUser {
  id: string;
}
