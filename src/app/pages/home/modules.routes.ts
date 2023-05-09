import { Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProfileComponent } from './profile/profile.component';
import { environment } from 'src/environments/environment';

export const modulesRoutes: Routes = [
  {
    path: 'dashboard',
    title: `${environment.appName} - Dashboard`,
    component: DashboardComponent,
  },
  {
    path: 'accounts',
    title: `${environment.appName} - Accounts`,
    component: AccountsComponent,
  },
  {
    path: 'categories',
    title: `${environment.appName} - Categories`,
    component: CategoriesComponent,
  },
  {
    path: 'transactions',
    title: `${environment.appName} - Transactions`,
    component: TransactionsComponent,
  },
  {
    path: 'profile',
    title: `${environment.appName} - Profile`,
    component: ProfileComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
