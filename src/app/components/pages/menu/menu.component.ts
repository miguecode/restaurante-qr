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
} from '@ionic/angular/standalone';
import { Producto } from 'src/app/classes/producto';
import { FormularioProductoComponent } from 'src/app/components/shared/formulario-producto/formulario-producto.component';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { Usuario } from 'src/app/classes/padres/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
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
  expression: any;

  constructor() {}

  ngOnInit() {
    console.log('');
  }

  toggleAgregar(producto: Producto) {
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

  mostrarPedido() {
    console.log('');
  }
}
