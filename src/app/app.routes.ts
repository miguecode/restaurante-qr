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
