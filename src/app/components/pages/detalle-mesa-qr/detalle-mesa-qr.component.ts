import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-mesa-qr',
  templateUrl: './detalle-mesa-qr.component.html',
  styleUrls: ['./detalle-mesa-qr.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class DetalleMesaQrComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
