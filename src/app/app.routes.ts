import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes').then((routes) => routes.homeRoutes)
  }
];
