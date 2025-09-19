import { type User, type UserCredential } from "@firebase/auth";

export interface IAuthContext {
  user: User | null;
  tokens: IAuthTokens;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<UserCredential | null>;
  register: (email: string, password: string) => Promise<UserCredential | null>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
}

export interface IAuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

export interface ICredentials {
  email: string;
  password: string;
}

export type IResetPassword = Pick<ICredentials, "email">;
