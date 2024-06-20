import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { FormularioDuenioComponent } from '../../../shared/formulario-duenio/formulario-duenio.component';

@Component({
  selector: 'app-alta-duenio',
  templateUrl: './alta-duenio.component.html',
  styleUrls: ['./alta-duenio.component.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, FormularioDuenioComponent],
})
export class AltaDuenioComponent implements OnInit {
  ngOnInit() {
    console.log('');
  }
}
