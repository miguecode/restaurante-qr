import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () =>
      import('./components/pages/splash/splash.component').then(
        (m) => m.SplashComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'abm-duenio',
    loadChildren: () =>
      import('./components/pages/abm-duenio/abm-duenio.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: 'abm-supervisor',
    loadChildren: () =>
      import('./components/pages/abm-supervisor/abm-supervisor.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: 'abm-empleado',
    loadChildren: () =>
      import('./components/pages/abm-empleado/abm-empleado.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: 'abm-cliente',
    loadChildren: () =>
      import('./components/pages/abm-cliente/abm-cliente.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
