import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  AbstractControlOptions,
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
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { HttpErrorResponse } from '@angular/common/http';
import { FormValidator } from 'src/helpers';
import { Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { errorTailorImports } from '@ngneat/error-tailor';

/**
 * Sign up form.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    PasswordModule,
    TooltipModule,
    errorTailorImports,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  /** User service. */
  private _userService = inject(UserService);

  /** Alert service. */
  private _alertService = inject(AlertService);

  /** Router. */
  private _router = inject(Router);

  /** Register form group. */
  registerForm: FormGroup = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.pattern(FormValidator.emailPattern)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(FormValidator.passwordPattern),
        ],
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      updateOn: 'blur',
      validators: FormValidator.validatePasswordsMatch(
        'password',
        'confirmPassword'
      ),
    } as AbstractControlOptions
  );

  /** Indicates if the form is loading. */
  isLoading = false;

  constructor(private fb: FormBuilder) {}

  /**
   * Register user.
   */
  registerUser(): void {
    this.isLoading = true;
    this._userService
      .registerUser(this.registerForm.value)
      .pipe(
        switchMap(() => {
          this._alertService.displayMessage({
            severity: 'success',
            summary: 'Cuenta creada exitosamente',
          });

          return this._userService.sendEmailConfirmation(
            this.registerForm.value.email
          );
        })
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this._router.navigateByUrl('/auth/confirm-email', {
            state: {
              email: this.registerForm.value.email,
            },
          });
        },
        error: (err: unknown) => {
          this.isLoading = false;
          this._alertService.displayMessage({
            severity: 'error',
            summary:
              (err as HttpErrorResponse)?.error?.error ||
              'Ha ocurrido un error',
          });
        },
      });
  }

  /**
   * Get password form field.
   */
  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  /**
   * Check if the password field is invalid.
   *
   * @returns True if invalid, false otherwise.
   */
  get isPasswordInvalid(): boolean {
    return (
      this.password !== null && this.password.touched && this.password.invalid
    );
  }

  /**
   * Get the password error message.
   *
   * @returns An error message to display when the password has errors.
   */
  get passwordErrorMessage(): string {
    return this.password?.hasError('required')
      ? 'El campo es requerido'
      : this.password?.hasError('minlength')
      ? 'El campo debe tener mínimo 6 carácteres'
      : this.password?.hasError('pattern')
      ? 'La contraseña debe contener al menos letras mayúsculas, minúsculas y números'
      : '';
  }
}
