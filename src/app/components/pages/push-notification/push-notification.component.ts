import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PushNotifications } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { Swalert } from 'src/app/classes/utils/swalert.class';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class PushNotificationComponent implements OnInit {
  inputValue: string = '';
  constructor(private plt: Platform) {}

  ngOnInit() {
    if (this.plt.is('android')) {
      this.addListeners();
      this.registerNotificacions();
    }
    Swalert.toastSuccess(`Hola`);
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
