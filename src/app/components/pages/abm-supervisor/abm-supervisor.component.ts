import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonTitle,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonContent,
} from '@ionic/angular/standalone';
import { Supervisor } from 'src/app/classes/supervisor';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { FormularioSupervisorComponent } from '../../shared/formulario-supervisor/formulario-supervisor.component';
import { RouterLink } from '@angular/router';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';

@Component({
  selector: 'app-abm-supervisor',
  templateUrl: './abm-supervisor.component.html',
  styleUrls: ['./abm-supervisor.component.scss'],
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
    FormularioSupervisorComponent,
    CapitalizePipe,
  ],
})
export class AbmSupervisorComponent implements OnInit {
  lista: Supervisor[] = [];
  supervisorSeleccionado: Supervisor | undefined = undefined;
  esAlta: boolean = false;
  esBaja: boolean = false;
  esModificar: boolean = false;

  constructor(private supervisorService: SupervisorService) {}

  ngOnInit() {
    this.supervisorService.traerTodosObservable().subscribe((l) => {
      this.lista = l;
    });
  }
}
