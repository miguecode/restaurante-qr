import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonTitle,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonContent,
} from '@ionic/angular/standalone';
import { Duenio } from 'src/app/classes/duenio';
import { DuenioService } from 'src/app/services/duenio.service';
import { FormularioDuenioComponent } from '../../shared/formulario-duenio/formulario-duenio.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-abm-duenio',
  templateUrl: './abm-duenio.component.html',
  styleUrls: ['./abm-duenio.component.scss'],
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
    FormularioDuenioComponent,
  ],
})
export class AbmDuenioComponent implements OnInit {
  lista: Duenio[] = [];
  duenioSeleccionado: Duenio | undefined = undefined;
  esAlta: boolean = false;
  esBaja: boolean = false;
  esModificar: boolean = false;

  constructor(private duenioService: DuenioService) {}

  ngOnInit() {
    this.duenioService.traerTodosObservable().subscribe((l) => {
      this.lista = l;
    });
  }
}
