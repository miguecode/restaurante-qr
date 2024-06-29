import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-abm-producto',
  templateUrl: './abm-producto.component.html',
  styleUrls: ['./abm-producto.component.scss'],
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
  ],
})
export class AbmProductoComponent implements OnInit {
  lista: Producto[] = [];
  productoSeleccionado: Producto | undefined = undefined;
  esAlta: boolean = false;
  esBaja: boolean = false;
  esModificar: boolean = false;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.traerTodosObservable().subscribe((l) => {
      this.lista = l;
    });
  }
}
