import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  LoginUser,
  RegisterUser,
  LoginUserResponse,
  SendEmail,
  User,
} from 'src/models';
import { Router } from '@angular/router';

const baseUrl = environment.baseUrl;

/**
 * User service.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /** Http client. */
  private _http = inject(HttpClient);

  /** Router. */
  private _router = inject(Router);

  /** Current access token life time. */
  currentAccessTokenLifeTime!: number;

  /**
   * The current user.
   *
   * @returns The user data.
   */
  get user(): User {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Set the current user.
   */
  set user(userData: User) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  /**
   * The access token for API authentication.
   *
   * @returns The access token.
   */
  get accessToken(): string {
    return localStorage.getItem('accessToken') || '';
  }

  /**
   * The access token for API authentication.
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
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
    return this._http
      .post<void>(`${baseUrl}/users/register`, user)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Login a user.
   *
   * @param user User data.
   * @returns Login response model.
   */
  loginUser(user: LoginUser): Observable<LoginUserResponse> {
    return this._http
      .post<LoginUserResponse>(`${baseUrl}/users/login`, user)
      .pipe(
        tap(({ user, accessToken }) => {
          this.user = user;
          this.accessToken = accessToken;
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  /**
   * Update the information of a user.
   *
   * @param userId The user's id.
   * @param user The user information.
   * @returns An empty observable.
   */
  updateUser(userId: string, user: Partial<User>): Observable<void> {
    return this._http
      .put<void>(`${baseUrl}/users/${userId}`, user)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Send an email confirmation to the user email address.
   *
   * @param userEmail User's email.
   * @returns An empty observable.
   */
  sendEmailConfirmation(userEmail: string): Observable<void> {
    return this._http.post<void>(`${baseUrl}/email/confirm-email`, <SendEmail>{
      recipient: userEmail,
    });
  }

  /**
   * Validate access token.
   *
   * @returns True if the token is valid, false otherwise.
   */
  validateToken(): Observable<boolean> {
    const url = `${baseUrl}/users/renew-token`;

    return this._http.get<LoginUserResponse>(url).pipe(
      map(({ user, accessToken }) => {
        this.user = user;
        this.accessToken = accessToken;

        return true;
      }),
      catchError(() => of(false))
    );
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

  /**
   * Log the user out.
   */
  logout(): void {
    localStorage.clear();
    this._router.navigateByUrl('/auth/login');
  }
}
