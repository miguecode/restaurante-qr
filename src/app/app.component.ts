import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { ApiService } from './services/api/api.service';
import { CloudStorageService } from './services/firebase/cloud-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    public router: Router,
    private apiService: ApiService,
    private cloud: CloudStorageService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    /*
    const source = await this.apiService.generarQrIngresoLocal();
    this.cloud.subirArchivoBase64(
      'utils',
      'sprestaurante@ingresolocal',
      source.base64
    );
    */
    // this.router.navigateByUrl('splash');
  }

  ionViewDitEnter() {
    SplashScreen.hide();
  }
}
