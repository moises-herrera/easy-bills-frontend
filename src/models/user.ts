import { Role } from '.';

/** User information. */
export interface User {
  /** User id. */
  id: string;

  /** First name. */
  firstName: string;

  /** Last name. */
  lastName: string;

  /** Email. */
  email: string;

  /** Password. */
  password: string;

  /** If the email is verified. */
  isEmailVerified: boolean;

  /** User role. */
  role: Role;
}
