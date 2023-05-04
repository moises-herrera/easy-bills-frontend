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
      icon: 'fa-solid fa-chart-line'
    },
    {
      title: 'Cuentas',
      url: 'accounts',
      icon: 'fa-solid fa-address-card'
    },
    {
      title: 'Categorías',
      url: 'categories',
      icon: 'fa-solid fa-tag'
    },
    {
      title: 'Transacciones',
      url: 'transactions',
      icon: 'fa-solid fa-briefcase'
    },
    {
      title: 'Perfil',
      url: 'profile',
      icon: 'fa-solid fa-user'
    }
  ];

  /**
   * Log the user out.
   */
  logout(): void {
    this._userService.logout();
  }
}
