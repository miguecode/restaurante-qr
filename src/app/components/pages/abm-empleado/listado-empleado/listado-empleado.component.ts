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
} from '@ionic/angular/standalone';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-listado-empleado',
  templateUrl: './listado-empleado.component.html',
  styleUrls: ['./listado-empleado.component.scss'],
  standalone: true,
  imports: [
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
    NgFor,
    NgIf,
  ],
})
export class ListadoEmpleadoComponent implements OnInit {
  lista: any[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit() {
    this.empleadoService.traerTodosObservable().subscribe((l) => {
      this.lista = l;
    });
  }
}
