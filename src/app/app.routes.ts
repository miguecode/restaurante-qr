import { Routes } from '@angular/router';
import { splashGuard } from './guards/splash.guard';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

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
    canActivate: [splashGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
    ...canActivate(() => redirectLoggedInTo(['/home'])),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/pages/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
    ...canActivate(() => redirectLoggedInTo(['/home'])),
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./components/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'abm-duenio',
    loadComponent: () =>
      import('./components/pages/abm-duenio/abm-duenio.component').then(
        (m) => m.AbmDuenioComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'abm-cliente',
    loadComponent: () =>
      import('./components/pages/abm-clientes/abm-clientes.component').then(
        (m) => m.AbmClientesComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'abm-supervisor',
    loadComponent: () =>
      import('./components/pages/abm-supervisor/abm-supervisor.component').then(
        (m) => m.AbmSupervisorComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'abm-empleado',
    loadComponent: () =>
      import('./components/pages/abm-empleado/abm-empleado.component').then(
        (m) => m.AbmEmpleadoComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'abm-mesa',
    loadComponent: () =>
      import('./components/pages/abm-mesa/abm-mesa.component').then(
        (m) => m.AbmMesaComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'abm-producto',
    loadComponent: () =>
      import('./components/pages/abm-producto/abm-producto.component').then(
        (m) => m.AbmProductoComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'push-notification',
    loadComponent: () =>
      import(
        './components/pages/push-notification/push-notification.component'
      ).then((m) => m.PushNotificationComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'seccion-abms',
    loadComponent: () =>
      import(
        './components/pages/home/seccion-abms/seccion-abms.component'
      ).then((m) => m.SeccionAbmsComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'listado-clientes',
    loadComponent: () =>
      import(
        './components/pages/listado-clientes-registro/listado-clientes-registro.component'
      ).then((m) => m.ListadoClientesRegistroComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'asignar-cliente-mesa-empleado',
    loadComponent: () =>
      import(
        './components/pages/asignar-cliente-mesa-empleado/asignar-cliente-mesa-empleado.component'
      ).then((m) => m.AsignarClienteMesaComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'asignar-cliente-mesa-qr/:idMesa',
    loadComponent: () =>
      import(
        './components/pages/asignar-mesa-cliente-qr/asignar-mesa-cliente-qr.component'
      ).then((m) => m.AsignarMesaClienteQrComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'detalle-mesa-qr/:idMesa',
    loadComponent: () =>
      import(
        './components/pages/detalle-mesa-qr/detalle-mesa-qr.component'
      ).then((m) => m.DetalleMesaQrComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'estado-mesa-qr/:idMesa',
    loadComponent: () =>
      import('./components/pages/estado-mesa-qr/estado-mesa-qr.component').then(
        (m) => m.EstadoMesaQrComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'chat-mozo/:idCliente',
    loadComponent: () =>
      import('./components/pages/chat-mozo/chat-mozo.component').then(
        (m) => m.ChatMozoComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'listado-chat',
    loadComponent: () =>
      import('./components/pages/listado-chat/listado-chat.component').then(
        (m) => m.ListadoChatComponent
      ),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'confirmar-pedidos-mozo',
    loadComponent: () =>
      import(
        './components/pages/confirmar-pedidos-mozo/confirmar-pedidos-mozo.component'
      ).then((m) => m.ConfirmarPedidosMozoComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'entregar-pedidos-mozo',
    loadComponent: () =>
      import(
        './components/pages/entregar-pedidos-mozo/entregar-pedidos-mozo.component'
      ).then((m) => m.EntregarPedidosMozoComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'confirmar-pagos-mozo',
    loadComponent: () =>
      import(
        './components/pages/confirmar-pagos-mozo/confirmar-pagos-mozo.component'
      ).then((m) => m.ConfirmarPagosMozoComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'listado-pedidos-empleado',
    loadComponent: () =>
      import(
        './components/pages/listado-pedidos-empleado/listado-pedidos-empleado.component'
      ).then((m) => m.ListadoPedidosEmpleadoComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
