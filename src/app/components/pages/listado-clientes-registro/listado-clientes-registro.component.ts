import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { Cliente } from 'src/app/classes/cliente';
import { ApiService } from 'src/app/services/api/api.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { RouterLink } from '@angular/router';
import { Estado } from 'src/app/classes/utils/enumerado';

@Component({
  selector: 'app-listado-clientes-registro',
  templateUrl: './listado-clientes-registro.component.html',
  styleUrls: ['./listado-clientes-registro.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    CapitalizePipe,
    RouterLink,
  ],
})
export class ListadoClientesRegistroComponent implements OnInit {
  listaClientes: Cliente[] = [];

  constructor(
    private apiServ: ApiService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.clienteService
      .traerTodosObservable()
      .subscribe((clientes: Cliente[]) => {
        this.listaClientes = clientes.filter(
          (cliente) => cliente.estado === Estado.pendiente
        ); // Aquí filtras por el estado que necesites
      });
  }

  cambioEstado(cliente: Cliente, estado: boolean) {
    if (estado == true) {
      cliente.estado = Estado.aceptado;
      this.clienteService.modificar(cliente);
      this.apiServ.enviarCorreo(cliente, true);
      return;
    } else {
      if (estado == false) {
        cliente.estado = Estado.rechazado;
        this.clienteService.modificar(cliente);
        this.apiServ.enviarCorreo(cliente, false);
        return;
      }
    }
  }
}
