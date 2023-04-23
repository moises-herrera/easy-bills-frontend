import { User } from './user';

/**
 * API Response when logging a user.
 */
export interface LoginUserResponse {
  /** User data. */
  user: User;

  /** Access token. */
  accessToken: string;
}
