import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';

/**
 * Login form page.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /** User service. */
  private _userService = inject(UserService);

  /** Alert service. */
  private _alertService = inject(AlertService);

  /** Login form. */
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  loginUser(): void {
    this._userService.loginUser(this.loginForm.value).subscribe({
      next: () => {
        this._alertService.displayMessage({
          severity: 'success',
          summary: 'Sesión iniciada exitosamente',
        });
      },
      error: () => {
        this._alertService.displayMessage({
          severity: 'error',
          summary: 'Ha ocurrido un error',
        });
      },
    });
  }
}
