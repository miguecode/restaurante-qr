import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonFooter,
  IonToolbar,
  IonContent,
  IonTitle,
} from '@ionic/angular/standalone';
import { firstValueFrom, isObservable } from 'rxjs';
import { Empleado } from 'src/app/classes/empleado';
import { Mesa } from 'src/app/classes/mesa';
import { Pedido } from 'src/app/classes/pedido';
import { Estado } from 'src/app/classes/utils/enumerado';
import { ApiService } from 'src/app/services/api/api.service';
import { MesaService } from 'src/app/services/mesa.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-confirmar-pagos-mozo',
  templateUrl: './confirmar-pagos-mozo.component.html',
  styleUrls: ['./confirmar-pagos-mozo.component.scss'],
  standalone: true,
  imports: [
    IonTitle,
    IonContent,
    IonToolbar,
    IonFooter,
    IonHeader,
    NgIf,
    NgFor,
    RouterLink,
  ],
})
export class ConfirmarPagosMozoComponent implements OnInit {
  lista: any[] = [];
  verDetalle: boolean = false;
  detallePedidoMesa: Pedido[] = [];
  idMesaPedido: number | undefined = undefined;

  importe: number = 0;
  tiempo: number = 0;

  idMesa: number = 0;

  private listaPedidos: Pedido[] = [];

  constructor(
    private pedidoService: PedidoService,
    private push: ApiService,
    private mesasService: MesaService
  ) {
    this.pedidoService.traerTodosObservable().subscribe((l) => {
      const fa = l.filter((p) => p.estado === Estado.pedidoPagado);

      this.listaPedidos = fa;

      // Agrupar por idMesa y contar la cantidad de pedidos por mesa
      const grouped = fa.reduce((acc: any, p) => {
        if (!acc[p.idMesa]) {
          acc[p.idMesa] = { idMesa: p.idMesa, cantidad: 0, precioTotal: 0 };
        }
        acc[p.idMesa].cantidad += 1;
        acc[p.idMesa].precioTotal = this.calcularPrecioTotal(p, fa);
        return acc;
      }, {});

      // Convertir el resultado en un array
      this.lista = Object.values(grouped);
    });
  }

  ngOnInit() {
    console.log('');
  }
  private calcularPrecioTotal(pedido: Pedido, lista: Pedido[]) {
    let acum = 0;
    for (let p of lista) {
      if (p.idMesa === pedido.idMesa) {
        acum += p.precio;
      }
    }

    return acum;
  }
  async confirmarPago(idMesa: number) {
    const lpm = this.listaPedidos.filter((p) => p.idMesa === idMesa);
    if (lpm !== undefined) {
      for (let p of lpm) {
        p.estado = Estado.pedidoPagoConfirmadoPorMozo;
        await this.pedidoService.modificar(p);
      }

      this.liberarMesa(idMesa);
    }
    this.verDetalle = false;
  }

  private liberarMesa(idMesa: number) {
    const mesa = this.mesasService.traerPorId(idMesa);
    if (mesa instanceof Mesa) {
      mesa.idCliente = 0;
      mesa.encuestaRealizada = false;
      mesa.apellidoCliente = '';
      mesa.nombreCliente = '';

      this.mesasService.modificar(mesa);
    }
  }

  verDetallePedido(idMesa: number) {
    this.verDetalle = false;
    const lpm = this.listaPedidos.filter((p) => p.idMesa === idMesa);
    if (lpm !== undefined) {
      console.log(lpm);
      this.detallePedidoMesa = lpm;
      this.idMesaPedido = lpm[0].idMesa;
      this.calcularImporte();
      this.calcularTiempo();
    }
  }

  private calcularImporte() {
    this.importe = this.detallePedidoMesa.reduce(
      (total, producto) => total + producto.precio,
      0
    );
  }

  private calcularTiempo() {
    const totalTiempo = this.detallePedidoMesa.reduce(
      (total, producto) => total + producto.tiempo,
      0
    );
    let tiempoCalculado = this.detallePedidoMesa.length
      ? totalTiempo / this.detallePedidoMesa.length
      : 0;

    this.tiempo = Math.round(tiempoCalculado);
  }
}
