import { Injectable } from '@angular/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  private token: Token | undefined = undefined;

  constructor(private plataform: Platform) {
    this.addListeners();
  }

  public async crearToken() {
    if (this.plataform.is('android')) {
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
  }
  public async addListeners() {
    if (this.plataform.is('android')) {
      await PushNotifications.addListener('registration', (token) => {
        this.token = token;
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
  public getToken() {
    return this.token === undefined ? '' : this.token.value;
  }
}
