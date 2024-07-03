import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
  IonFooter,
  IonItem,
} from '@ionic/angular/standalone';
import { Producto } from 'src/app/classes/producto';
import { FormularioProductoComponent } from 'src/app/components/shared/formulario-producto/formulario-producto.component';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Pedido } from 'src/app/classes/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { Cliente } from 'src/app/classes/cliente';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonFooter,
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
    RouterLink,
    NgFor,
    NgIf,
    FormularioProductoComponent,
    CapitalizePipe,
    NgClass,
  ],
})
export class MenuComponent implements OnInit {
  @Input() usuario: Usuario | undefined = undefined;
  @Input() lista: Producto[] = [];
  @Input() mostrarSpinner: boolean = false;

  productoSeleccionado: Producto | undefined = undefined;
  productosSeleccionados: Producto[] = [];
  importe: number = 0;
  tiempo: number = 0;

  esperandoConfirmacion: boolean = false;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.limpiarMenu();
  }

  async toggleAgregar(producto: Producto) {
    const index = this.productosSeleccionados.findIndex(
      (p) => p.id === producto.id
    );

    if (index > -1) {
      this.productosSeleccionados.splice(index, 1);
    } else {
      this.productosSeleccionados.push(producto);
    }

    this.calcularImporte();
    this.calcularTiempo();
  }

  getPedido(producto: Producto) {
    let pedido = new Pedido();
    if (
      producto.precio > 0 &&
      producto.tiempo > 0 &&
      this.usuario !== undefined
    ) {
      pedido.setProducto(producto);
      pedido.confirmadoMozo = false;
      pedido.idCliente = this.usuario.id;
      if (this.usuario instanceof Cliente) {
        pedido.idMesa = this.usuario.idMesa;
      }
    } else {
      Swalert.toastError('El pedido tiene datos no válidos');
    }

    return pedido;
  }

  productoEstaSeleccionado(producto: Producto): boolean {
    return this.productosSeleccionados.some((p) => p.id === producto.id);
  }

  private calcularImporte() {
    this.importe = this.productosSeleccionados.reduce(
      (total, producto) => total + producto.precio,
      0
    );
  }

  private calcularTiempo() {
    const totalTiempo = this.productosSeleccionados.reduce(
      (total, producto) => total + producto.tiempo,
      0
    );
    let tiempoCalculado = this.productosSeleccionados.length
      ? totalTiempo / this.productosSeleccionados.length
      : 0;

    this.tiempo = Math.round(tiempoCalculado);
  }

  async confirmarPedido() {
    if (this.productosSeleccionados.length > 0) {
      this.mostrarSpinner = true;

      console.log(this.productosSeleccionados);

      try {
        for (const producto of this.productosSeleccionados) {
          const pedido = this.getPedido(producto);
          await this.pedidoService.alta(pedido);
        }

        this.esperandoConfirmacion = true;
        this.limpiarMenu();
        Swalert.toastSuccess('¡Pedido realizado exitosamente!');
      } catch (error) {
        Swalert.toastError('Error en el alta de pedido: ' + error);
      } finally {
        this.mostrarSpinner = false;
      }
    } else {
      Swalert.toastError('No hay pedidos por hacer');
    }
  }

  private limpiarMenu() {
    this.importe = 0;
    this.tiempo = 0;
    this.productosSeleccionados = [];
  }

  mostrarPedido() {
    console.log('');
  }
}
