import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
  IonFooter,
} from '@ionic/angular/standalone';
import { Duenio } from 'src/app/classes/duenio';
import { FormularioDuenioComponent } from 'src/app/components/shared/formulario-duenio/formulario-duenio.component';
import { DuenioService } from 'src/app/services/duenio.service';

@Component({
  selector: 'app-abm-duenio',
  templateUrl: './abm-duenio.component.html',
  styleUrls: ['./abm-duenio.component.scss'],
  standalone: true,
  imports: [
    IonFooter,
    RouterLink,
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
    FormularioDuenioComponent,
    NgFor,
    NgIf,
  ],
})
export class AbmDuenioComponent implements OnInit {
  lista: Duenio[] = [];
  duenioSeleccionado: Duenio | undefined = undefined;
  esAlta: boolean = false;
  esBaja: boolean = false;
  esModificar: boolean = false;

  constructor(private duenioService: DuenioService, private router: Router) {}

  ngOnInit() {
    this.duenioService.traerTodosObservable().subscribe((l) => {
      this.lista = l;
    });
  }
}
