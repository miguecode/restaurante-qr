import { Component, OnInit } from '@angular/core';
import { Encuesta } from 'src/app/classes/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonFooter,
} from '@ionic/angular/standalone';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alta-encuesta',
  templateUrl: './alta-encuesta.component.html',
  styleUrls: ['./alta-encuesta.component.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonContent,
    IonToolbar,
    IonTitle,
    IonHeader,
    NgFor,
    NgIf,
    CapitalizePipe,
    RouterLink,
  ],
})
export class AltaEncuestaComponent implements OnInit {
  verDetalle: boolean = false;
  encuesta: Encuesta = new Encuesta();

  constructor(
    private encuestaService: EncuestaService,
    private usuarioService: UsuarioService
  ) {}

  async ngOnInit() {
    const u = await this.usuarioService.getUsuarioBd();
    this.encuesta.setUsuario(u);
  }

  async altaEncuesta() {
    const rs: any[] = [
      document.getElementById('r0'),
      document.getElementById('r1'),
      document.getElementById('r2'),
      document.getElementById('r3'),
    ];
    console.log('rs[0]', rs[0].value);
    console.log('rs[1]', rs[1].value);
    console.log('rs[2]', rs[2].value);
    console.log('rs[3]', rs[3].value);
    this.encuesta.respuestas = [
      this.encuesta.preguntas[0].respuestas[rs[0].value],
      this.encuesta.preguntas[1].respuestas[rs[1].value],
      this.encuesta.preguntas[2].respuestas[rs[2].value],
      this.encuesta.preguntas[3].respuestas[rs[3].value],
    ];
    console.log('this.encuesta', this.encuesta);
    await this.encuestaService.alta(this.encuesta);
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
    await this.encuestaService.alta(e);*/
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
