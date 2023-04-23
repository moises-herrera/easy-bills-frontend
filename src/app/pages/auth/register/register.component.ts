import { Component, inject } from '@angular/core';
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
import { HttpErrorResponse } from '@angular/common/http';
import { FormValidator } from 'src/helpers';

/**
 * Sign up form.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  /** User service. */
  private _userService = inject(UserService);

  /** Alert service. */
  private _alertService = inject(AlertService);

  /** Register form group. */
  registerForm: FormGroup = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validators: FormValidator.validateEqualFields(
        'password',
        'confirmPassword'
      )
    }
  );

  constructor(private fb: FormBuilder) {}

  /**
   * Register user.
   */
  registerUser(): void {
    this._userService.registerUser(this.registerForm.value).subscribe({
      next: () => {
        this._alertService.displayMessage({
          severity: 'success',
          summary: 'Cuenta creada exitosamente',
        });
      },
      error: (err: unknown) => {
        this._alertService.displayMessage({
          severity: 'error',
          summary:
            (err as HttpErrorResponse)?.error?.error || 'Ha ocurrido un error',
        });
      },
    });
  }
}
