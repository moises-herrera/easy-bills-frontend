import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser, RegisterUser, LoginUserResponse } from 'src/models';

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

  /** The access token for API authentication. */
  accessToken!: string;

  /**
   * Register a user.
   *
   * @param user User data.
   * @returns An empty observable.
   */
  registerUser(user: RegisterUser): Observable<void> {
    return this._http
      .post<void>(`${baseUrl}/users`, user)
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
          this.accessToken = accessToken;
          localStorage.setItem('user', JSON.stringify(user));
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  /**
   * Send an email confirmation to the user email address.
   *
   * @param userEmail User's email.
   * @returns An empty observable.
   */
  sendEmailConfirmation(userEmail: string): Observable<void> {
    return this._http.post<void>(`${baseUrl}/email/confirm-email`, { userEmail });
  }
}
