import { CommonModule } from '@angular/common';
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
import { Cliente } from 'src/app/classes/cliente';
import { Duenio } from 'src/app/classes/duenio';
import { Empleado } from 'src/app/classes/empleado';
import { Supervisor } from 'src/app/classes/supervisor';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SeccionAbmsComponent } from './seccion-abms/seccion-abms.component';
import { Usuario } from 'src/app/classes/padres/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
    SeccionAbmsComponent,
  ],
})
export class HomeComponent implements OnInit {
  usuarioActual: Empleado | Duenio | Supervisor | Cliente | undefined =
    undefined;
  mostrarSpinner: boolean = true;
  mostrarAbms: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuarioActual();
  }

  async getUsuarioActual() {
    this.mostrarSpinner = true;
    try {
      this.usuarioActual = await this.usuarioService.getUsuarioBd();
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
    } finally {
      this.mostrarSpinner = false;
      console.log(this.usuarioActual);
    }
  }

  esEmpleado() {
    return this.usuarioActual instanceof Empleado;
  }

  getTipo() {
    if (this.usuarioActual instanceof Empleado) {
      return this.usuarioActual.tipo;
    }

    return '';
  }
}
