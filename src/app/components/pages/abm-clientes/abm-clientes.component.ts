<<<<<<< HEAD

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar, IonContent, IonFooter } from "@ionic/angular/standalone";
=======
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonFooter,
  IonButton,
} from '@ionic/angular/standalone';
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
import { Cliente } from 'src/app/classes/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormularioClienteComponent } from '../../shared/formulario-cliente/formulario-cliente.component';
import { RouterLink } from '@angular/router';
<<<<<<< HEAD
=======
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b

@Component({
  selector: 'app-abm-clientes',
  templateUrl: './abm-clientes.component.html',
  styleUrls: ['./abm-clientes.component.scss'],
  standalone: true,
<<<<<<< HEAD
  imports: [IonFooter, IonContent, IonToolbar, IonTitle, IonHeader, CommonModule, FormularioClienteComponent, RouterLink]
})
export class AbmClientesComponent  implements OnInit {

=======
  imports: [
    IonButton,
    IonFooter,
    IonContent,
    IonToolbar,
    IonTitle,
    IonHeader,
    CommonModule,
    FormularioClienteComponent,
    RouterLink,
    CapitalizePipe,
  ],
})
export class AbmClientesComponent implements OnInit {
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
  lista: Cliente[] = [];
  clienteSeleccionado: Cliente | undefined = undefined;
  esAlta: boolean = false;
  esBaja: boolean = false;
  esModificar: boolean = false;

<<<<<<< HEAD
  constructor(private clienteService: ClienteService) { }
=======
  constructor(private clienteService: ClienteService) {}
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b

  ngOnInit() {
    this.clienteService.traerTodosObservable().subscribe((l) => {
      this.lista = l;
    });
  }

<<<<<<< HEAD
}
=======
  ocultarForms() {
    this.esAlta = false;
    this.esBaja = false;
    this.esModificar = false;
  }
}
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
