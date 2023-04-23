import { Injectable } from '@angular/core';
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
  constructor(private http: HttpClient) {}

  registerUser(user: RegisterUser): Observable<void> {
    return this.http.post<void>(`${baseUrl}/users`, user);
  }

  loginUser(user: LoginUser): Observable<LoginUserResponse> {
    return this.http.post<LoginUserResponse>(`${baseUrl}/users/login`, user);
  }
}
