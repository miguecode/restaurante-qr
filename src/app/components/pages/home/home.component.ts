import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { Mesa } from 'src/app/classes/mesa';
import { ApiService } from 'src/app/services/api/api.service';
import { CloudStorageService } from 'src/app/services/firebase/cloud-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonLabel,
    IonButton,
    FormsModule,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class HomeComponent implements OnInit {
  source1: any = undefined;
  source2: any = undefined;

  constructor(
    private apiService: ApiService,
    private cloudStorageService: CloudStorageService
  ) {}

  public ngOnInit() {
    console.log('');
  }

  public async generarQr() {
    const m1 = new Mesa();
    const m2 = new Mesa();
    m1.id = 1000;
    m2.id = 1500;

    const s1 = await this.apiService.generarQrMesa(m1);
    const s2 = await this.apiService.generarQrMesa(m2);

    this.source1 = s1.png;
    this.source2 = s2.png;

    console.log('png mesa 100', s1.png);
    console.log('png mesa 500', s1.png);

    await this.cloudStorageService.subirArchivoBase64(
      'qr-mesa-test',
      m1.id.toString(),
      s1.base64
    );
    await this.cloudStorageService.subirArchivoBase64(
      'qr-mesa-test',
      m2.id.toString(),
      s2.base64
    );
  }
}
