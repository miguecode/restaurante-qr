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
    path: 'abm-mesa',
    loadComponent: () =>
      import('./components/pages/abm-mesa/abm-mesa.component').then(
        (m) => m.AbmMesaComponent
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
