import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidator } from 'src/helpers';
import { UserService } from 'src/app/services/user.service';
import { PasswordModule } from 'primeng/password';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ButtonModule } from 'primeng/button';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * User profile.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    errorTailorImports,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  /** User service. */
  private _userService = inject(UserService);

  /** Alert service. */
  private _alertService = inject(AlertService);

  /** Form builder. */
  private _fb = inject(FormBuilder);

  /** User information form. */
  profileForm = this._fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [
      '',
      [Validators.required, Validators.pattern(FormValidator.emailPattern)],
    ],
    password: [
      '',
      [Validators.min(6), Validators.pattern(FormValidator.passwordPattern)],
    ],
  });

  constructor() {
    this.setUserInfo();
  }

  /**
   * Set the user info on the form.
   */
  private setUserInfo(): void {
    const { password, ...user } = this._userService.user;
    this.profileForm.patchValue({ ...user });
  }

  /**
   * Save the user profile.
   */
  saveProfile(): void {
    this._userService
      .updateUser(this._userService.user.id, this.profileForm.value)
      .subscribe({
        next: () => {
          this._alertService.displayMessage({
            severity: 'success',
            summary: 'Información guardada exitosamente',
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
      });
  }

  /**
   * Cancel changes.
   */
  cancelChanges(): void {
    this.setUserInfo();
  }
}
