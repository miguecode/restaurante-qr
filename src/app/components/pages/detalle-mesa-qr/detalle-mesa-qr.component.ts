import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { Cliente } from 'src/app/classes/cliente';
import { Empleado } from 'src/app/classes/empleado';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { Producto } from 'src/app/classes/producto';
import { Mesa } from 'src/app/classes/mesa';
import { MesaService } from 'src/app/services/mesa.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { filter } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';
import { Pedido } from 'src/app/classes/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { Estado } from 'src/app/classes/utils/enumerado';

@Component({
  selector: 'app-detalle-mesa-qr',
  templateUrl: './detalle-mesa-qr.component.html',
  styleUrls: ['./detalle-mesa-qr.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonLabel,
    IonButton,
    FormsModule,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    MenuComponent,
  ],
})
export class DetalleMesaQrComponent implements OnInit {
  usuario: Usuario | Cliente | undefined = undefined;
  mostrarSpinner: boolean = false;
  mostrarMenu: boolean = false;
  mostrarEstado: boolean = false;

  listaEmpleados: Empleado[] = [];
  listaClientes: Cliente[] = [];
  listaMesas: Mesa[] = [];
  listaProductos: Producto[] = [];
  listaPedidos: Pedido[] = [];
  listaPedidosDeEstaMesa: Pedido[] = [];
  idMesa: number = 0;
  estadoPedido: string = '';

  usuarioEsCliente: boolean = false;
  usuarioEstaEnListaEspera: boolean = false;
  usuarioTieneMesa: boolean = false;
  usuarioTienePedido: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private clienteSerivice: ClienteService,
    private mesaService: MesaService,
    private productoService: ProductoService,
    private pedidosService: PedidoService,
    private router: Router
  ) {
    this.mostrarEstado = false;
    this.mostrarMenu = false;

    this.clienteSerivice.traerTodosObservable().subscribe((l) => {
      this.listaClientes = l;
    });

    this.mesaService.traerTodosObservable().subscribe((l) => {
      this.listaMesas = l;
    });

    this.productoService.traerTodosObservable().subscribe((l) => {
      this.listaProductos = l;
    });

    this.pedidosService.traerTodosObservable().subscribe((l) => {
      this.listaPedidos = l;
      this.cargarPedidosDeEstaMesa;
      this.calcularEstadoPedido();
    });
  }

  ngOnInit() {
    try {
      this.mostrarSpinner = true;
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(async () => {
          try {
            this.mostrarSpinner = true;
            await this.cargarDatosImportantes();
          } catch (e: any) {
            Swalert.toastError(e.message);
            console.log(e.message);
          } finally {
            this.mostrarSpinner = false;
          }
        });
    } catch (e: any) {
      Swalert.toastError(e.message);
      console.log(e.message);
    }
  }

  private async cargarDatosImportantes() {
    this.usuario = await this.usuarioService.getUsuarioBd();

    if (this.usuario instanceof Cliente) {
      this.idMesa = this.usuario.idMesa;
      this.usuarioEsCliente = true;
      this.usuarioEstaEnListaEspera = this.usuario.estadoListaEspera;
      this.mostrarEstado = false;
      this.mostrarMenu = false;
      await this.cargarPedidosDeEstaMesa();
      await this.calcularEstadoPedido();
    }
  }

  private async cargarPedidosDeEstaMesa() {
    if (this.idMesa > 0) {
      this.listaPedidosDeEstaMesa = this.listaPedidos.filter(
        (pedido) => pedido.idMesa === this.idMesa
      );
    }
  }

  private async calcularEstadoPedido() {
    if (this.listaPedidosDeEstaMesa.length < 1) {
      this.usuarioTienePedido = false;
      return;
    } else {
      this.usuarioTienePedido = true;
    }

    let estadoPedido = Estado.pedidoPendiente;

    let hayElaborando = false;
    let todosPendiente = true;
    let todosTerminado = true;
    let todosEntregado = true;
    let todosPagado = true;

    for (const pedido of this.listaPedidosDeEstaMesa) {
      if (pedido.estado === Estado.pedidoElaborando) {
        hayElaborando = true;
        todosPendiente = false;
        todosTerminado = false;
        todosEntregado = false;
        todosPagado = false;
      } else if (pedido.estado !== Estado.pedidoPendiente) {
        todosPendiente = false;
      }
      if (pedido.estado !== Estado.pedidoTerminado) {
        todosTerminado = false;
      }
      if (pedido.estado !== Estado.pedidoEntregado) {
        todosEntregado = false;
      }
      if (pedido.estado !== Estado.pedidoPagado) {
        todosPagado = false;
      }
    }

    if (hayElaborando) {
      estadoPedido = Estado.pedidoElaborando;
    } else if (todosTerminado) {
      estadoPedido = Estado.pedidoTerminado;
    } else if (todosEntregado) {
      estadoPedido = Estado.pedidoEntregado;
    } else if (todosPagado) {
      estadoPedido = Estado.pedidoPagado;
    } else if (todosPendiente) {
      estadoPedido = Estado.pedidoPendiente;
    }

    this.estadoPedido = estadoPedido;
  }

  public async clienteToChatMozo() {
    if (this.usuario === undefined) {
      this.usuario = await this.usuarioService.getUsuarioBd();
    }

    if (this.usuario instanceof Cliente) {
      this.router.navigateByUrl(`/chat-mozo/${this.usuario.id}`);
    }
  }
}
