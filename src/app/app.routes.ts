import { Routes } from '@angular/router';
import { noLogeadoGuard } from './guards/no-logeado.guard';

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
    path: 'register',
    loadComponent: () =>
      import('./components/pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
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
    loadComponent: () =>
      import('./components/pages/abm-duenio/abm-duenio.component').then(
        (m) => m.AbmDuenioComponent
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
    path: 'abm-supervisor',
    loadComponent: () =>
      import('./components/pages/abm-supervisor/abm-supervisor.component').then(
        (m) => m.AbmSupervisorComponent
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
    path: 'abm-mesa',
    loadComponent: () =>
      import('./components/pages/abm-mesa/abm-mesa.component').then(
        (m) => m.AbmMesaComponent
      ),
  },
  {
    path: 'abm-producto',
    loadComponent: () =>
      import('./components/pages/abm-producto/abm-producto.component').then(
        (m) => m.AbmProductoComponent
      ),
  },
  {
    path: 'push-notification',
    loadComponent: () =>
      import(
        './components/pages/push-notification/push-notification.component'
      ).then((m) => m.PushNotificationComponent),
  },
  {
    path: 'seccion-abms',
    loadComponent: () =>
      import(
        './components/pages/home/seccion-abms/seccion-abms.component'
      ).then((m) => m.SeccionAbmsComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
