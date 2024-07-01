import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Empleado } from 'src/app/classes/empleado';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { ApiService } from 'src/app/services/api/api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PushNotificationService } from 'src/app/services/utils/push-notification.service';
import { IonContent } from '@ionic/angular/standalone';
import { Estado } from 'src/app/classes/cliente';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
  standalone: true,
  imports: [IonContent, FormsModule, RouterLink, JsonPipe],
})
export class PushNotificationComponent {
  tokenValue: string = '';
  responseValue: any = 'Esperando respuesta del API';
  nombreValue: string = '';
  correoValue: string = '';
  estadoA : Estado = Estado.aceptado;
  estadoR : Estado = Estado.rechazado;
  constructor(
    private apiService: ApiService,
    private usuarioService: UsuarioService,
    private pushNotificationService: PushNotificationService
  ) {}

  

  public async notificarUnUsuario() {
    try {
      let e = new Empleado();
      e.nombre = 'kevin';
      e.token = this.tokenValue;
      let r = await this.apiService.notificarUnUsuario(e, `Hola ${e.nombre}`);
      this.responseValue = await r.json();

      console.log(this.responseValue);
    } catch (e: any) {
      this.responseValue = e.message;
      console.log(e.message);
    }
  }
  public async notificarMozos() {
    try {
      let r = await this.apiService.notificarEmpleados(
        Empleado.T_MOZO,
        `Notificando a todos los mozos`
      );
      this.responseValue = await r.json();

      console.log(this.responseValue);
    } catch (e: any) {
      this.responseValue = e.message;
      console.log(e.message);
    }
  }
  public async notificarMaitre() {
    try {
      let r = await this.apiService.notificarEmpleados(
        Empleado.T_METRE,
        `Un cliente se ha unido a la lista de espera`
      );
      this.responseValue = await r.json();

      console.log(this.responseValue);
    } catch (e: any) {
      this.responseValue = e.message;
      console.log(e.message);
    }
  }
  public async notificarBartenders() {
    try {
      let r = await this.apiService.notificarEmpleados(
        Empleado.T_BARTENDER,
        `Notificando a todos los bartenders`
      );
      this.responseValue = await r.json();

      console.log(this.responseValue);
    } catch (e: any) {
      this.responseValue = e.message;
      console.log(e.message);
    }
  }
  public async notificarCocineros() {
    try {
      let r = await this.apiService.notificarEmpleados(
        Empleado.T_COCINERO,
        `Notificando a todos los cocineros`
      );
      this.responseValue = await r.json();

      console.log(this.responseValue);
    } catch (e: any) {
      this.responseValue = e.message;
      console.log(e.message);
    }
  }
  public async notificarDuenios() {
    try {
      let r = await this.apiService.notificarDuenios(
        `Notificando a todos los dueños`
      );
      this.responseValue = await r.json();

      console.log(this.responseValue);
    } catch (e: any) {
      this.responseValue = e.message;
      console.log(e.message);
    }
  }
  public async notificarSupervisores() {
    try {
      let r = await this.apiService.notificarSupervisores(
        `Notificando a todos los supervisores`
      );
      this.responseValue = await r.json();

      console.log(this.responseValue);
    } catch (e: any) {
      this.responseValue = e.message;
      console.log(e.message);
    }
  }

  public async enviarCorreo(aceptacion: boolean) {
    try {
      let e = new Empleado();
      e.nombre = 'juan pablo';
      e.correo = this.correoValue;

      let r = await this.apiService.enviarCorreo(e, aceptacion);
      this.responseValue = await r.json();

      console.log(this.responseValue);
    } catch (e: any) {
      this.responseValue = e.message;
      console.log(e.message);
    }
  }
  public async verToken() {
    this.tokenValue = this.pushNotificationService.getToken();
  }
}
