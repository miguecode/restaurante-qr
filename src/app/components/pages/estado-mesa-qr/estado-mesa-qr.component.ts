import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonFooter,
  IonHeader,
  IonToolbar,
  IonContent,
} from '@ionic/angular/standalone';
import { Mesa } from 'src/app/classes/mesa';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';

@Component({
  selector: 'app-estado-mesa-qr',
  templateUrl: './estado-mesa-qr.component.html',
  styleUrls: ['./estado-mesa-qr.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonToolbar,
    IonHeader,
    IonFooter,
    RouterLink,
    NgIf,
    CapitalizePipe,
  ],
})
export class EstadoMesaQrComponent implements OnInit {
  mesa: Mesa = new Mesa();
  constructor() {}

  ngOnInit() {}
}
