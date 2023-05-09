import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { MessagesModule } from 'primeng/messages';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormValidator } from 'src/helpers';
import { errorTailorImports } from '@ngneat/error-tailor';
import { EMPTY, switchMap, tap } from 'rxjs';

/**
 * Login form page.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    errorTailorImports,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /** User service. */
  private _userService = inject(UserService);

  /** Alert service. */
  private _alertService = inject(AlertService);

  /** Router. */
  private _router = inject(Router);

  /** Login form. */
  loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(FormValidator.emailPattern)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder) {}

  /**
   * Login user.
   */
  loginUser(): void {
    this._userService
      .loginUser(this.loginForm.value)
      .pipe(
        switchMap(({ user }) => {
          if (user.isEmailVerified) {
            this._alertService.displayMessage({
              severity: 'success',
              summary: 'Sesión iniciada exitosamente',
            });
            this._router.navigateByUrl('/home');
            return EMPTY;
          }

          return this._userService
            .sendEmailConfirmation(this.loginForm.value.email)
            .pipe(
              tap(() => {
                this._router.navigateByUrl('/auth/confirm-email', {
                  state: { email: user.email },
                });
              })
            );
        })
      )
      .subscribe({
        error: (err: unknown) => {
          this._alertService.displayMessage({
            severity: 'error',
            summary:
              (err as HttpErrorResponse)?.error?.error ||
              'Ha ocurrido un error',
          });
        },
      });
  }
}
