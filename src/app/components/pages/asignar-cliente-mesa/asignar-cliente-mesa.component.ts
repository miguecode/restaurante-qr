import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Cliente } from 'src/app/classes/cliente';
import { Mesa } from 'src/app/classes/mesa';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { ClienteService } from 'src/app/services/cliente.service';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-asignar-cliente-mesa',
  templateUrl: './asignar-cliente-mesa.component.html',
  styleUrls: ['./asignar-cliente-mesa.component.scss'],
  standalone: true,
  imports: [IonContent, NgFor, NgIf, RouterLink, CapitalizePipe],
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
    private mesaService: MesaService
  ) {
    this.clienteService.traerTodosObservable().subscribe((l) => {
      /*
      const filtrado = l.filter((c) => c.estadoListaEspera === true);
      this.listaClientes = filtrado.sort(
        (a, b) => a.fechaListaEspera.getTime() - b.fechaListaEspera.getTime()
      );
      */

      this.listaClientes = l;
    });
    this.mesaService.traerTodosObservable().subscribe((l) => {
      this.listaMesas = l.filter((m) => m.idCliente === 0);
    });
  }

  ngOnInit() {
    console.log('');
  }

  vincular() {
    if (
      this.clienteSeleccionado === undefined ||
      this.mesaSeleccionada === undefined
    ) {
      return;
    }

    console.log('Entidades a Vincular');
    console.log('clienteSeleccionado', this.clienteSeleccionado);
    console.log('mesaSeleccionada', this.mesaSeleccionada);
    //this.mesaSeleccionada.setCliente(this.clienteSeleccionado);
    //this.mesaService.modificar(this.mesaSeleccionada);
  }
}
