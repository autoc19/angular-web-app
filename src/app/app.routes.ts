import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth.guard';
import { AdminLayoutComponent } from '@core/layout/admin-layout/admin-layout.component';
import { BlankLayoutComponent } from '@core/layout/blank-layout/blank-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'auth',
    component: BlankLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('@features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('@features/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: '404 - Not Found',
  },
];
