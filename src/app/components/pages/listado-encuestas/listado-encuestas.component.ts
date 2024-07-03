import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
} from '@ionic/angular/standalone';
import { Encuesta } from 'src/app/classes/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-listado-encuestas',
  templateUrl: './listado-encuestas.component.html',
  styleUrls: ['./listado-encuestas.component.scss'],
  standalone: true,
  imports: [
    IonTitle,
    IonContent,
    IonToolbar,
    IonHeader,
    NgFor,
    NgIf,
    RouterLink,
  ],
})
export class ListadoEncuestasComponent implements OnInit {
  lista: Encuesta[] = [];
  verDetalle: boolean = false;
  encuestaDetalle: Encuesta | undefined = undefined;

  constructor(private encuestaService: EncuestaService) {}

  async ngOnInit() {
    this.encuestaService.traerTodosObservable().subscribe((l) => {
      this.lista = l;
    });

    /*
    // Usar esto para hardcodear Encuestas
    let e = new Encuesta();
    e.idUsuario = 1;
    e.fecha = new Date(2024, 3 - 1, 6, 8, 15);
    e.respuestas = [
      e.preguntas[0].respuestas[2],
      e.preguntas[1].respuestas[2],
      e.preguntas[2].respuestas[2],
      e.preguntas[3].respuestas[1],
      e.preguntas[3].respuestas[2],
    ];
    console.log(e);
    await this.encuestaService.alta(e);

    e.idUsuario = 2;
    e.fecha = new Date(2024, 4 - 1, 15, 20, 30);
    e.respuestas = [
      e.preguntas[0].respuestas[2],
      e.preguntas[1].respuestas[1],
      e.preguntas[2].respuestas[2],
      e.preguntas[3].respuestas[1],
      e.preguntas[3].respuestas[2],
    ];
    console.log(e);
    await this.encuestaService.alta(e);

    e.idUsuario = 3;
    e.fecha = new Date(2024, 4 - 1, 20, 8, 30);
    e.respuestas = [
      e.preguntas[0].respuestas[1],
      e.preguntas[1].respuestas[2],
      e.preguntas[2].respuestas[1],
      e.preguntas[3].respuestas[1],
      e.preguntas[3].respuestas[2],
    ];
    console.log(e);
    await this.encuestaService.alta(e);

    e.idUsuario = 4;
    e.fecha = new Date(2024, 5 - 1, 5, 10, 55);
    e.respuestas = [
      e.preguntas[0].respuestas[2],
      e.preguntas[1].respuestas[1],
      e.preguntas[2].respuestas[2],
      e.preguntas[3].respuestas[3],
      e.preguntas[3].respuestas[1],
    ];
    console.log(e);
    await this.encuestaService.alta(e);
    */
  }

  verDetalleEncuesta(encuensta: Encuesta) {
    this.encuestaDetalle = encuensta;
    this.verDetalle = true;
  }

  public getNombreDia(fecha: Date) {
    switch (fecha.getDay()) {
      case 1:
        return 'Lunes';
      case 2:
        return 'Martes';
      case 3:
        return 'Miercoles';
      case 4:
        return 'Jueves';
      case 5:
        return 'Viernes';
      case 6:
        return 'Sabado';
      case 0:
        return 'Domingo';
      default:
        return 'x';
    }
  }
  public formatoDia(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minuto = fecha.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${anio} ${hora}:${minuto}`;
  }
}
