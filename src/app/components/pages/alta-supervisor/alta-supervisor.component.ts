import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { FormularioSupervisorComponent } from '../../shared/formulario-supervisor/formulario-supervisor.component';

@Component({
  selector: 'app-alta-supervisor',
  templateUrl: './alta-supervisor.component.html',
  styleUrls: ['./alta-supervisor.component.scss'],
  standalone: true,
  imports: [IonContent, RouterLink, FormularioSupervisorComponent],
})
export class AltaSupervisorComponent implements OnInit {
  ngOnInit() {
    console.log('');
  }
}
