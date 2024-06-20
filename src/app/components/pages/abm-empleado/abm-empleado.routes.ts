import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full',
  },
  {
    path: 'listado',
    loadComponent: () =>
      import('./listado-empleado/listado-empleado.component').then(
        (m) => m.ListadoEmpleadoComponent
      ),
  },
  {
    path: 'alta',
    loadComponent: () =>
      import('../abm-empleado/alta-empleado/alta-empleado.component').then(
        (m) => m.AltaEmpleadoComponent
      ),
  },
];
