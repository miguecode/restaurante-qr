import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-empleado',
  templateUrl: './listado-empleado.component.html',
  styleUrls: ['./listado-empleado.component.scss'],
  standalone: true,
  imports: [],
})
export class ListadoEmpleadoComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('');
  }
}
