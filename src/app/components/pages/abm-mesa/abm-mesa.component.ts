import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
  IonFooter,
} from '@ionic/angular/standalone';
import { Mesa } from 'src/app/classes/mesa';
import { FormularioMesaComponent } from 'src/app/components/shared/formulario-mesa/formulario-mesa.component';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-abm-mesa',
  templateUrl: './abm-mesa.component.html',
  styleUrls: ['./abm-mesa.component.scss'],
  standalone: true,
  imports: [
    IonFooter,
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
    RouterLink,
    NgFor,
    NgIf,
    FormularioMesaComponent,
  ],
})
export class AbmMesaComponent implements OnInit {
  lista: Mesa[] = [];
  mesaSeleccionada: Mesa | undefined = undefined;
  esAlta: boolean = false;
  esBaja: boolean = false;
  esModificar: boolean = false;

  constructor(private mesaService: MesaService) {}

  ngOnInit() {
    this.mesaService.traerTodosObservable().subscribe((l) => {
      this.lista = l;
    });
  }
}
