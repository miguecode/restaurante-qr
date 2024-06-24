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
    loadComponent: () =>
      import('./components/pages/abm-empleado/abm-empleado.component').then(
        (m) => m.AbmEmpleadoComponent
      ),
  },
  {
    path: 'abm-cliente',
    loadComponent: () =>
      import('./components/pages/abm-clientes/abm-clientes.component').then(
        (m) => m.AbmClientesComponent
      ),
  },
  {
    path: 'abm-mesa',
    loadComponent: () =>
      import('./components/pages/abm-mesa/abm-mesa.component').then(
        (m) => m.AbmMesaComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
