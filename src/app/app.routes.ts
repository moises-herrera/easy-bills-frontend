import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((routes) => routes.authRoutes),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    canMatch: [authGuard],
    loadChildren: () =>
      import('./pages/home/home.routes').then((routes) => routes.homeRoutes),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
