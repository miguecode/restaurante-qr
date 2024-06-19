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
      import('./listado-cliente/listado-cliente.component').then(
        (m) => m.ListadoClienteComponent
      ),
  },
  {
    path: 'alta',
    loadComponent: () =>
      import('../abm-cliente/alta-cliente/alta-cliente.component').then(
        (m) => m.AltaClienteComponent
      ),
  },
];
