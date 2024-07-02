import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-estado-mesa-qr',
  templateUrl: './estado-mesa-qr.component.html',
  styleUrls: ['./estado-mesa-qr.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class EstadoMesaQrComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
