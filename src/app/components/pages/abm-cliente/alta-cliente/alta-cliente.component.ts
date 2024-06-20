import { Component, OnInit } from '@angular/core';
import { FormularioClienteComponent } from '../../../shared/formulario-cliente/formulario-cliente.component';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, FormularioClienteComponent],
})
export class AltaClienteComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('');
  }
}
