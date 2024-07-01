import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { CapitalizePipe } from "../../../pipes/capitalize.pipe";
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api/api.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente, Estado } from 'src/app/classes/cliente';

@Component({
    selector: 'app-lista-espera',
    templateUrl: './lista-espera.component.html',
    styleUrls: ['./lista-espera.component.scss'],
    standalone: true,
    imports: [IonTitle, IonToolbar, IonContent, IonHeader, CapitalizePipe, CommonModule]
})
export class ListaEsperaComponent  implements OnInit {

  listaClientes: Cliente[] = [];

  constructor(private apiServ : ApiService, private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.traerTodosObservable().subscribe((clientes: Cliente[]) => {
      this.listaClientes = clientes
        .filter(cliente => cliente.estadoListaEspera === true) // Filtra por el estado
        .sort((a, b) => new Date(a.fechaListaEspera).getTime() - new Date(b.fechaListaEspera).getTime()); // Este es el error, aca filtralo como quieras, yo se lo pedi a gpt
    });
  }

}
