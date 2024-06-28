
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar, IonContent, IonFooter } from "@ionic/angular/standalone";
import { Cliente } from 'src/app/classes/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormularioClienteComponent } from '../../shared/formulario-cliente/formulario-cliente.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-abm-clientes',
  templateUrl: './abm-clientes.component.html',
  styleUrls: ['./abm-clientes.component.scss'],
  standalone: true,
  imports: [IonFooter, IonContent, IonToolbar, IonTitle, IonHeader, CommonModule, FormularioClienteComponent, RouterLink]
})
export class AbmClientesComponent  implements OnInit {

  lista: Cliente[] = [];
  clienteSeleccionado: Cliente | undefined = undefined;
  esAlta: boolean = false;
  esBaja: boolean = false;
  esModificar: boolean = false;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.traerTodosObservable().subscribe((l) => {
      this.lista = l;
    });
  }

}