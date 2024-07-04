import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonFooter,
  IonToolbar,
  IonHeader,
} from '@ionic/angular/standalone';
import { Cliente } from 'src/app/classes/cliente';
import { Mesa } from 'src/app/classes/mesa';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { ChatService } from 'src/app/services/chat.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-asignar-cliente-mesa',
  templateUrl: './asignar-cliente-mesa-empleado.component.html',
  styleUrls: ['./asignar-cliente-mesa-empleado.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonFooter,
    IonContent,
    NgFor,
    NgIf,
    RouterLink,
    CapitalizePipe,
  ],
})
export class AsignarClienteMesaComponent implements OnInit {
  clienteSeleccionado: Cliente | undefined = undefined;
  listaClientes: Cliente[] = [];
  mostrarClientes: boolean = true;

  mesaSeleccionada: Mesa | undefined = undefined;
  listaMesas: Mesa[] = [];
  mostrarMesas: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private mesaService: MesaService,
    private chatService: ChatService,
    private router: Router
  ) {
    this.clienteService.traerTodosObservable().subscribe((l) => {
      const filtrado = l.filter((c) => c.estadoListaEspera === true);
      this.listaClientes = filtrado.sort(
        (a, b) => a.fechaListaEspera.getTime() - b.fechaListaEspera.getTime()
      );
    });
    this.mesaService.traerTodosObservable().subscribe((l) => {
      this.listaMesas = l.filter((m) => m.idCliente === 0);
    });
  }

  ngOnInit() {
    console.log('');
  }

  async vincular() {
    if (
      this.clienteSeleccionado === undefined ||
      this.mesaSeleccionada === undefined
    ) {
      return;
    }

    this.mesaSeleccionada.setCliente(this.clienteSeleccionado);
    await this.mesaService.modificar(this.mesaSeleccionada);
    this.clienteSeleccionado.estadoListaEspera = false;
    await this.clienteService.modificar(this.clienteSeleccionado);
    await this.chatService.alta(this.clienteSeleccionado.id);
    this.mesaSeleccionada = undefined;
    this.clienteSeleccionado = undefined;
    this.mostrarClientes = true;
    this.mostrarMesas = false;
    Swalert.toastSuccess('Mesa asignada correctamente');
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 1500);
  }
}
