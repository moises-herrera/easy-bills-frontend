import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/models';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit {
  /** User service. */
  private _userService = inject(UserService);

  /** Location url. */
  private _location = inject(Location);

  /** Activated route. */
  private _activatedRoute = inject(ActivatedRoute);

  /** Router. */
  private _router = inject(Router);

  /** Alert service. */
  private _alertService = inject(AlertService);

  /** User email. */
  userEmail!: string;

  /** Email token. */
  emailToken!: string;

  /** Loading state. */
  isLoading = false;

  /**
   * Get the current user.
   *
   * @returns The current user.
   */
  get user(): User {
    return this._userService.user;
  }

  constructor() {
    this.userEmail = (this._location.getState() as any)?.email as string;
  }

  /**
   * Initial life cycle method.
   */
  ngOnInit(): void {
    this._activatedRoute.queryParams
      .pipe(
        switchMap(({ userId, token }) => {
          if (this.user.isEmailVerified) {
            this._router.navigateByUrl('/home');
            return EMPTY;
          }

          if (userId && token) {
            this.isLoading = true;
            this.emailToken = token;

            return this._userService.verifyEmail(userId, token).pipe(
              tap({
                next: () => {
                  this.isLoading = false;
                  this._userService.user = {
                    ...this.user,
                    isEmailVerified: true,
                  };
                  this._alertService.displayMessage({
                    severity: 'success',
                    summary: 'Tu cuenta de usuario ha sido verificada',
                  });
                },
                error: (err: unknown) => {
                  this._alertService.displayMessage({
                    severity: 'error',
                    summary:
                      (err as HttpErrorResponse)?.error?.error ||
                      'Ha ocurrido un error',
                  });
                },
              })
            );
          }

          return EMPTY;
        })
      )
      .subscribe();
  }
}
