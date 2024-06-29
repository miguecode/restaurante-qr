import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PushNotifications } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { Empleado } from 'src/app/classes/empleado';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { ApiService } from 'src/app/services/api/api.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
  standalone: true,
  imports: [RouterLink, JsonPipe],
})
export class PushNotificationComponent implements OnInit {
  inputValue: string = '';
  responseValue: any = 'esperando';
  constructor(
    private plt: Platform,
    private apiService: ApiService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    if (this.plt.is('android')) {
      this.addListeners();
      //this.registerNotificacions();
    }
  }

  public async notificar(numero: number) {
    try {
      await this.usuarioService.iniciarSesion(
        UsuarioService.ACCESOS_RAPIDOS[0]
      );

      let e = new Empleado();
      e.nombre = 'kevin';
      e.token =
        'eJze0zyIQh60-wgVh26VfS:APA91bE2Nsh5-yz06txuE9JmV5arTYChM3J6YZGoRkn9yUTxAzJpJQ9GvkRoR7gy5-WliuhJdk4uaJcQF2ECsrpqrw8zQ3YndZtZLHH8RfolHYmAbcpEetPxMFeNbh5xO0wxv-GINbzN';
      let r: any;
      switch (numero) {
        case 1:
          e.tipo = Empleado.T_COCINERO;
          r = await this.apiService.notificarCocinero(e);
          this.responseValue = await r.json();
          break;
      }
      await Swalert.toastSuccess(JSON.stringify(this.responseValue));
      console.log(this.responseValue);
    } catch (e: any) {
      this.responseValue = e;
      await Swalert.toastError(e.message);
      console.log(e.message);
    } finally {
      setTimeout(() => {
        this.responseValue = '';
      }, 1000);
    }
  }

  async registerNotificacions() {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      Swalert.toastError(`User denied permissions!`);
      console.log('User denied permissions!');
    }

    await PushNotifications.register();
  }

  async addListeners() {
    await PushNotifications.addListener('registration', (token) => {
      this.inputValue = token.value;
      Swalert.toastSuccess(`Registration token: ${token.value}`);
      console.log('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', (e) => {
      Swalert.toastError(`Registration error: ${e.error}`);
      console.log('Registration error: ', e.error);
    });

    await PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        Swalert.toastSuccess(`Push notification received: ${notification}`);
        console.log('Push notification received: ', notification);
      }
    );

    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        Swalert.toastSuccess(
          `Push notification action performed: ACTIONID:${notification.actionId} || INPUTVALUE:${notification.inputValue}`
        );
        console.log(
          'Push notification action performed: ',
          notification.actionId,
          notification.inputValue
        );
      }
    );
  }
}
