import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'src/models';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  /** User service. */
  private _userService = inject(UserService);

  /** Navigation links. */
  links: MenuItem[] = [
    {
      title: 'Dashboard',
      url: 'dashboard',
    },
    {
      title: 'Cuentas',
      url: 'accounts',
    },
    {
      title: 'Categorías',
      url: 'categories',
    },
    {
      title: 'Transacciones',
      url: 'transactions',
    },
  ];

  /**
   * Log the user out.
   */
  logout(): void {
    this._userService.logout();
  }
}
