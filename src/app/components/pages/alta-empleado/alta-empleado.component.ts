import { Component, OnInit } from '@angular/core';
import { FormularioEmpleadoComponent } from '../../shared/formulario-empleado/formulario-empleado.component';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, FormularioEmpleadoComponent],
})
export class AltaEmpleadoComponent implements OnInit {
  ngOnInit() {
    console.log('');
  }
}
