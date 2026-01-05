export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
};

export type RegisterSuccessResponse = {
  id: number;
  name: string;
  email: string;
};

export type AuthErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

export type LoginSuccessResponse = {
  token: string;
  token_type: string;
};

export type LoginInput = {
  email: string;
  password: string;
};
