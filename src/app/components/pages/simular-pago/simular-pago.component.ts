import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-simular-pago',
  templateUrl: './simular-pago.component.html',
  styleUrls: ['./simular-pago.component.scss'],
  standalone: true,
  imports: [IonContent, CommonModule],
})
export class SimularPagoComponent implements OnInit {
  verProcesando: boolean = false;
  verError: boolean = false;
  verExito: boolean = false;

  private simular: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.simular) {
      this.verProcesando = true;
      setTimeout(() => {
        this.verProcesando = false;
        const c = this.generarCamino();
        switch (c) {
          case 1:
            this.verExito = true;
            break;

          default:
            this.verError = true;
            setTimeout(() => {
              this.router.navigateByUrl('/detalle-cuenta');
            }, 4000);
        }
      }, 4000);
    }
  }

  private generarCamino() {
    let max = 2;
    let min = 1;
    max += 1;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
