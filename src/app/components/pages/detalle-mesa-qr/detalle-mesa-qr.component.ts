import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
  IonFooter,
} from '@ionic/angular/standalone';
import { Cliente } from 'src/app/classes/cliente';
import { Empleado } from 'src/app/classes/empleado';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { Producto } from 'src/app/classes/producto';
import { Mesa } from 'src/app/classes/mesa';
import { MesaService } from 'src/app/services/mesa.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { MenuComponent } from '../menu/menu.component';
import { Pedido } from 'src/app/classes/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { Estado } from 'src/app/classes/utils/enumerado';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Duenio } from 'src/app/classes/duenio';
import { Supervisor } from 'src/app/classes/supervisor';
import { firstValueFrom, isObservable } from 'rxjs';
import { BarcodeScanningService } from 'src/app/services/utils/barcode-scanning.service';
import { TraductorQr } from 'src/app/classes/utils/traductor-qr';

@Component({
  selector: 'app-detalle-mesa-qr',
  templateUrl: './detalle-mesa-qr.component.html',
  styleUrls: ['./detalle-mesa-qr.component.scss'],
  standalone: true,
  imports: [
    IonFooter,
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
  usuario: Usuario | Duenio | Supervisor | Empleado | Cliente | undefined =
    undefined;
  mesa: Mesa | undefined = undefined;
  mostrarSpinner: boolean = false;
  mostrarMenu: boolean = false;
  mostrarEstado: boolean = false;
  mostrarEscanearPropina: boolean = false;

  listaEmpleados: Empleado[] = [];
  listaClientes: Cliente[] = [];
  listaMesas: Mesa[] = [];
  listaProductos: Producto[] = [];
  listaPedidos: Pedido[] = [];
  listaPedidosDeEstaMesa: Pedido[] = [];
  estadoPedido: string = '';
  idMesaParametros: any = '';
  idMesa: number = 0;

  usuarioEstaEnListaEspera: boolean = false;
  usuarioTieneMesa: boolean = false;
  usuarioTienePedido: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private clienteSerivice: ClienteService,
    private mesaService: MesaService,
    private productoService: ProductoService,
    private pedidosService: PedidoService,
    private route: ActivatedRoute,
    private router: Router,
    private barcodeScanningService: BarcodeScanningService
  ) {
    this.mostrarEstado = false;
    this.mostrarMenu = false;
    this.mostrarEscanearPropina = false;

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
      console.log(this.listaPedidos);
      this.cargarPedidosDeEstaMesa();
      this.calcularEstadoPedido();
    });
  }

  async ngOnInit() {
    try {
      this.mostrarSpinner = true;
      const obs = this.route.params;

      if (isObservable(obs)) {
        const paramsPromise = await firstValueFrom(obs);
        this.idMesaParametros = Number(paramsPromise['idMesa']);
        this.idMesa = this.idMesaParametros;
        this.mesa = await this.mesaService.traerPorId(this.idMesaParametros);

        console.log(this.mesa);

        const usuario = await this.usuarioService.getUsuarioBd();
        if (usuario instanceof Cliente) {
          this.usuario = usuario;
          console.log('entro aca');
          console.log(usuario);
          this.cargarDatosImportantes();
        }
      }
    } catch (e: any) {
      Swalert.toastError(e.message);
      console.log(e.message);
    } finally {
      this.mostrarSpinner = false;
    }
  }

  private async cargarDatosImportantes() {
    if (this.usuario instanceof Cliente) {
      this.usuarioEstaEnListaEspera = this.usuario!.estadoListaEspera;
      this.mostrarEstado = false;
      this.mostrarMenu = false;
      this.mostrarEscanearPropina = false;

      await this.cargarPedidosDeEstaMesa();
      await this.calcularEstadoPedido();
      console.log(this.listaPedidos);
      console.log(this.listaPedidosDeEstaMesa);
    }
  }

  private async cargarPedidosDeEstaMesa() {
    if (this.idMesa > 0) {
      this.listaPedidosDeEstaMesa = this.listaPedidos.filter(
        (pedido) => pedido.idMesa === this.mesa!.id
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

  async confirmarRecepcion(idMesa: number) {
    const lpm = this.listaPedidos.filter((p) => p.idMesa === idMesa);
    if (lpm !== undefined) {
      for (let p of lpm) {
        p.estado = Estado.pedidoEntregado;
        await this.pedidosService.modificar(p);
      }
    }
  }

  async escanearQrPropina() {
    const dataQr = await this.barcodeScanningService.escanearQr();
    const usuario = await this.usuarioService.getUsuarioBd();
    // const source = TraductorQr.propina(dataQr);

    try {
      // await Swalert.toastSuccess(source.toString());
      // if (source !== false) {
      //   if (usuario instanceof Cliente) {
      //     await this.mesaService.accesoDeClientePorQrMesa(source, usuario);
      //   } else if (usuario instanceof Empleado) {
      //     await this.mesaService.accesoDeEmpleadoPorQrMesa(source, usuario);
      //   }
      // }
    } catch (e: any) {
      Swalert.toastError(e.message);
    }
  }
}
