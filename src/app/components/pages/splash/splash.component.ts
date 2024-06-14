import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  standalone: true,
  imports: [IonContent],
})
export class SplashComponent implements OnInit {
  constructor(public router: Router) {
    setTimeout(() => {
      this.router.navigateByUrl('');
    }, 2000);
  }

  ngOnInit() {
    console.log('Splash dinámico');
  }
}
