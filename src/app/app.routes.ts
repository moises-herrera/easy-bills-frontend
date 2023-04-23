import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then((routes) => routes.authRoutes)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes').then((routes) => routes.homeRoutes)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
