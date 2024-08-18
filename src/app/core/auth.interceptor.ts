import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

const NO_AUTH_ROUTES: string[] = [
  '/login',
  '/register',
  '/confirm-email'
];

/**
 * Intercept HTTP requests to append the access token.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /** User service. */
  private _userService = inject(UserService);

  /**
   * Check if a route requires authorization.
   *
   * @param url The URL.
   * @returns If the route requires authorization.
   */
  private routeRequiresAuth(url: string): boolean {
    return NO_AUTH_ROUTES.every((route) => !url.includes(route));
  }

  /**
   * Set the access token to the intercepted request.
   *
   * @param request The current request.
   * @param next The HTTP handler.
   * @returns Http event.
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.routeRequiresAuth(request.url)) {
      if (!this._userService.isSessionActive()) {
        this._userService.logout();

        return EMPTY;
      }

      const authRequest = this.setAuthToken(request);
      return next.handle(authRequest);
    }

    return next.handle(request);
  }

  private setAuthToken(request: HttpRequest<unknown>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._userService.accessToken}`,
      },
    });
  }
}
