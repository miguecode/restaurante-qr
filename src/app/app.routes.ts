import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'iniciar-sesion',
    loadComponent: () =>
      import('./components/pages/iniciar-sesion/iniciar-sesion.component').then(
        (m) => m.IniciarSesionComponent
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
    path: 'home',
    loadComponent: () =>
      import('./components/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
