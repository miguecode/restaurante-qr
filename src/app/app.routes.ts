import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
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
    loadChildren: () =>
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
    path: 'alta-duenio',
    loadComponent: () =>
      import('./components/pages/alta-duenio/alta-duenio.component').then(
        (m) => m.AltaDuenioComponent
      ),
  },
  {
    path: 'alta-supervisor',
    loadComponent: () =>
      import(
        './components/pages/alta-supervisor/alta-supervisor.component'
      ).then((m) => m.AltaSupervisorComponent),
  },
  {
    path: 'alta-empleado',
    loadComponent: () =>
      import('./components/pages/alta-empleado/alta-empleado.component').then(
        (m) => m.AltaEmpleadoComponent
      ),
  },
  {
    path: 'alta-cliente',
    loadComponent: () =>
      import('./components/pages/alta-cliente/alta-cliente.component').then(
        (m) => m.AltaClienteComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
