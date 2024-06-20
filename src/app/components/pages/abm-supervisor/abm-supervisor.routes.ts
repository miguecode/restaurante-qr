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
      import('./listado-supervisor/listado-supervisor.component').then(
        (m) => m.ListadoSupervisorComponent
      ),
  },
  {
    path: 'alta',
    loadComponent: () =>
      import(
        '../abm-supervisor/alta-supervisor/alta-supervisor.component'
      ).then((m) => m.AltaSupervisorComponent),
  },
];
