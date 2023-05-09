import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

/**
 * Authentication page.
 */
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  /** User service. */
  private _userService = inject(UserService);

  /** Router. */
  private _router = inject(Router);

  /**
   * Initial life cycle method.
   */
  ngOnInit(): void {
    if (
      (this._router.url.includes('login') ||
        this._router.url.includes('register')) &&
      this._userService.isSessionActive()
    ) {
      this._router.navigateByUrl('/home');
    }
  }
}
