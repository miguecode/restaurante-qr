export enum Estado {
  undefined = '',

  pendiente = 'pendiente',
  aceptado = 'aceptado',
  rechazado = 'rechazado',

  pedidoPendiente = 'pendiente',
  pedidoElaborando = 'elaborando',
  pedidoTerminado = 'terminado',
  pedidoEntregado = 'entregado',
  pedidoRecibido = 'recibido',
  pedidoPagado = 'pagado',
  pedidoPagoConfirmadoPorMozo = 'pagoConfirmadoPorMozo',
}
