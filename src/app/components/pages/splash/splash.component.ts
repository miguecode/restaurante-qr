import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  standalone: true,
  imports: [IonContent],
})
export class SplashComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 150);
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 5000);
  }
}
