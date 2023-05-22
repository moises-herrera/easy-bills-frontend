import { Observable, of, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  User,
  RegisterUser,
  LoginUser,
  LoginUserResponse,
  Role,
} from 'src/models';

/**
 * Mock user service.
 */
export class MockUserService {
  /** Current access token life time. */
  currentAccessTokenLifeTime!: number;

  /** The stored user. */
  private _storedUser: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@gmail.com',
    password: '8r574fdgkj3562',
    isEmailVerified: true,
    role: Role.user,
  };

  /** The access token. */
  private _accessToken: string = 'gjckjg4o3474kcje';

  /**
   * The current user.
   *
   * @returns The user data.
   */
  get user(): User {
    return { ...this._storedUser };
  }

  /**
   * Set the current user.
   */
  set user(userData: User) {
    this._storedUser = { ...userData };
  }

  /**
   * The access token for API authentication.
   *
   * @returns The access token.
   */
  get accessToken(): string {
    return this._accessToken;
  }

  /**
   * The access token for API authentication.
   */
  set accessToken(token: string) {
    this._accessToken = token;
    this.currentAccessTokenLifeTime =
      Date.now() + environment.accessTokenLifetime;
  }

  /**
   * Register a user.
   *
   * @param user User data.
   * @returns An empty observable.
   */
  registerUser(user: RegisterUser): Observable<void> {
    return of().pipe(delay(1000));
  }

  /**
   * Login a user.
   *
   * @param user User data.
   * @returns Login response model.
   */
  loginUser(user: LoginUser): Observable<LoginUserResponse> {
    const loginResponse: LoginUserResponse = {
      user: {
        id: 'vcjhg4hgt3476',
        firstName: 'John',
        lastName: 'Doe',
        email: user.email,
        password: 'vrke535cp58xhwd56',
        isEmailVerified: true,
        role: Role.user,
      },
      accessToken: 'access-token',
    };

    return of(loginResponse).pipe(delay(1000));
  }

  /**
   * Send an email confirmation to the user email address.
   *
   * @param userEmail User's email.
   * @returns An empty observable.
   */
  sendEmailConfirmation(userEmail: string): Observable<void> {
    return of().pipe(delay(1000));
  }

  /**
   * Validate access token.
   *
   * @returns True if the token is valid, false otherwise.
   */
  validateToken(): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }

  /**
   * Check if the access token is expired.
   *
   * @returns If the token is expired.
   */
  isAccessTokenExpired(): boolean {
    return Date.now() >= this.currentAccessTokenLifeTime;
  }

  /**
   * Check if the session is active.
   *
   * @returns Whether the session is active or not.
   */
  isSessionActive(): boolean {
    return !!this.accessToken && !this.isAccessTokenExpired();
  }

  verifyEmail(userId: string, token: string): Observable<User> {
    return of(this._storedUser).pipe(delay(1000));
  }
}
