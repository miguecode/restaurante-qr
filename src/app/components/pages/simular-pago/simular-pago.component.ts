import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { firstValueFrom, isObservable } from 'rxjs';
import { Empleado } from 'src/app/classes/empleado';
import { ApiService } from 'src/app/services/api/api.service';
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
  idMesa: number = 0;

  constructor(private router: Router, private pushService: ApiService, private route: ActivatedRoute) {}

  async ngOnInit() {

    const obs = this.route.params;
    if (isObservable(obs)) {
      const paramsPromise = await firstValueFrom(obs);
      this.idMesa = Number(paramsPromise['idMesa']);
    }


    if (this.simular) {
      this.verProcesando = true;
      setTimeout(() => {
        this.verProcesando = false;
        const c = this.generarCamino();
        switch (c) {
          case 1:
            this.verExito = true;
            this.pushService.notificarPedidoCuenta(Empleado.T_MOZO, `El cliente de la mesa pidio la cuenta`, this.idMesa)
            setTimeout(() => {
              this.router.navigateByUrl('/home');
            }, 4000);
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
