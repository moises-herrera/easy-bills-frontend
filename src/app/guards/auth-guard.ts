import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable, tap } from 'rxjs';

/**
 * Verify if the current user can access to a specific route.
 *
 * @returns Whether the user is authorized or not.
 */
export const authGuard = (): Observable<boolean> => {
  /** Router. */
  const router = inject(Router);

  /** User service. */
  const userService = inject(UserService);

  return userService.validateToken().pipe(
    tap((isAuth) => {
      return !isAuth ? router.navigateByUrl('/auth/login') : true;
    })
  );
};
