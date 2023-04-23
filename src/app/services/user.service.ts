import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  /**
   * Register a user.
   *
   * @param user User data.
   * @returns An empty observable.
   */
  registerUser(user: RegisterUser): Observable<void> {
    return this._http.post<void>(`${baseUrl}/users`, user);
  }

  /**
   * Login a user.
   *
   * @param user User data.
   * @returns Login response model.
   */
  loginUser(user: LoginUser): Observable<LoginUserResponse> {
    return this._http.post<LoginUserResponse>(`${baseUrl}/users/login`, user);
  }
}
