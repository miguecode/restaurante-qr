import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonContent } from '@ionic/angular/standalone';
import { SplashService } from 'src/app/services/utils/splash.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  standalone: true,
  imports: [IonContent],
})
export class SplashComponent implements OnInit {
  constructor(public router: Router, private splashService: SplashService) {}

  ngOnInit() {
    this.splashService.estadoMostrado = true;
    setTimeout(() => {
      SplashScreen.hide();
    }, 150);
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 2500);
  }
}
