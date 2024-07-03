import { NgFor, NgIf } from '@angular/common';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonFooter,
} from '@ionic/angular/standalone';
import { Pedido } from 'src/app/classes/pedido';
import { Estado } from 'src/app/classes/utils/enumerado';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-confirmar-pedidos-mozo',
  templateUrl: './confirmar-pedidos-mozo.component.html',
  styleUrls: ['./confirmar-pedidos-mozo.component.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonToolbar,
    IonContent,
    IonHeader,
    IonTitle,
    CapitalizePipe,
    NgFor,
    NgIf,
    RouterLink,
  ],
})
export class ConfirmarPedidosMozoComponent{
  lista: any[] = [];
  verDetalle: boolean = false;
  detallePedidoMesa: Pedido[] = [];
  idMesaPedido: number | undefined = undefined;

  importe: number = 0;
  tiempo: number = 0;

  private listaPedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {
    this.pedidoService.traerTodosObservable().subscribe((l) => {
      const fa = l.filter((p) => p.confirmadoMozo === false);

      this.listaPedidos = fa;

      // Agrupar por idMesa y contar la cantidad de pedidos por mesa
      const grouped = fa.reduce((acc: any, p) => {
        if (!acc[p.idMesa]) {
          acc[p.idMesa] = { idMesa: p.idMesa, cantidad: 0 };
        }
        acc[p.idMesa].cantidad += 1;
        return acc;
      }, {});

      // Convertir el resultado en un array
      this.lista = Object.values(grouped);
    });
  }


  async confirmarPedido(idMesa: number) {
    const lpm = this.listaPedidos.filter((p) => p.idMesa === idMesa);
    if (lpm !== undefined) {
      for (let p of lpm) {
        p.confirmadoMozo = true;
        p.estado = Estado.pedidoElaborando;
        await this.pedidoService.modificar(p);
      }
    }
    this.verDetalle = false;
  }

  verDetallePedido(idMesa: number) {
    this.verDetalle = true;
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
