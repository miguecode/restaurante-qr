import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonTitle,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonContent,
} from '@ionic/angular/standalone';
import { Empleado } from 'src/app/classes/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FormularioEmpleadoComponent } from '../../shared/formulario-empleado/formulario-empleado.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-abm-empleado',
  templateUrl: './abm-empleado.component.html',
  styleUrls: ['./abm-empleado.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonFooter,
    IonToolbar,
    IonHeader,
    IonTitle,
    RouterLink,
    NgIf,
    NgFor,
    FormularioEmpleadoComponent,
  ],
})
export class AbmEmpleadoComponent implements OnInit {
  lista: Empleado[] = [];
  empleadoSeleccionado: Empleado | undefined = undefined;
  esAlta: boolean = false;
  esBaja: boolean = false;
  esModificar: boolean = false;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit() {
    this.empleadoService.traerTodosObservable().subscribe((l) => {
      this.lista = l;
    });
  }
}
