import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { FormularioIngresoComponent } from '../../shared/formulario-ingreso/formulario-ingreso.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, FormularioIngresoComponent],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('Login');
  }
}
