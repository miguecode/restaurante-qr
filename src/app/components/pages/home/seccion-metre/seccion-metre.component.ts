import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonContent, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-seccion-metre',
  templateUrl: './seccion-metre.component.html',
  styleUrls: ['./seccion-metre.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonContent, IonHeader, RouterLink],
})
export class SeccionMetreComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
