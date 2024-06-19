import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(public router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.router.navigateByUrl('splash');
  }

  ionViewDitEnter() {
    SplashScreen.hide();
  }
}
