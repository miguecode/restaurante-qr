import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
import { Cliente } from 'src/app/classes/cliente';
import { Duenio } from 'src/app/classes/duenio';
import { Empleado } from 'src/app/classes/empleado';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Supervisor } from 'src/app/classes/supervisor';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-seccion-abms',
  templateUrl: './seccion-abms.component.html',
  styleUrls: ['./seccion-abms.component.scss'],
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
    CommonModule,
  ],
})
export class SeccionAbmsComponent implements OnInit {
  usuarioActual: Empleado | Duenio | Supervisor | Cliente | undefined =
    undefined;
  mostrarSpinner: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    console.log('Sección ABMS');
  }
}
