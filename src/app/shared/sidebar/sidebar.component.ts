import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'src/models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
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
}
