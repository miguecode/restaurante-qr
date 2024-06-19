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
      import('./listado-duenio/listado-duenio.component').then(
        (m) => m.ListadoDuenioComponent
      ),
  },
  {
    path: 'alta',
    loadComponent: () =>
      import('../abm-duenio/alta-duenio/alta-duenio.component').then(
        (m) => m.AltaDuenioComponent
      ),
  },
];
