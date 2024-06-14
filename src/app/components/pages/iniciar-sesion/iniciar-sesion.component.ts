import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonIcon,
  IonList,
  IonButton,
  IonFooter,
  IonToolbar,
  IonItem,
  IonInput,
  IonLabel,
  IonContent,
  IonRange,
  IonTitle,
} from '@ionic/angular/standalone';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    IonTitle,
    IonRange,
    IonContent,
    IonLabel,
    IonInput,
    IonItem,
    IonToolbar,
    IonFooter,
    IonButton,
    IonList,
    IonIcon,
    IonHeader,
  ],
})
export class IniciarSesionComponent implements OnInit {
  usuario: Usuario = new Usuario();
  selectedValue: number = 0;
  mostrarSpinner: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  public ngOnInit() {
    console.log('');
  }

  public inciarSesion() {
    this.mostrarSpinner = true;
    try {
      //this.usuarioService.iniciarSesion(this.usuario);
      Swalert.toastSuccess('Accion iniciar sesion');
    } catch (e: any) {
      Swalert.toastError(e.message);
    } finally {
      this.mostrarSpinner = false;
    }
  }

  public limpiar() {
    this.usuario.correo = '';
    this.usuario.clave = '';
    this.selectedValue = 0;
  }

  public cargarUsuario(indice: number) {
    if (indice === 0) {
      this.limpiar();
      return;
    }
    this.usuario = UsuarioService.ACCESOS_RAPIDOS[indice - 1];
  }
}
