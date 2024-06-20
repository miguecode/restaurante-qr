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

@Component({
  selector: 'app-listado-duenio',
  templateUrl: './listado-duenio.component.html',
  styleUrls: ['./listado-duenio.component.scss'],
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
export class ListadoDuenioComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('');
  }
}
