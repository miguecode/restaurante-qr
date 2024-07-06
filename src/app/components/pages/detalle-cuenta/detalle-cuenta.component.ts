import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonChip,
} from '@ionic/angular/standalone';
import { firstValueFrom, isObservable } from 'rxjs';
import { Cliente } from 'src/app/classes/cliente';
import { Duenio } from 'src/app/classes/duenio';
import { Empleado } from 'src/app/classes/empleado';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Pedido } from 'src/app/classes/pedido';
import { Supervisor } from 'src/app/classes/supervisor';
import { Estado } from 'src/app/classes/utils/enumerado';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.scss'],
  standalone: true,
  imports: [IonChip, IonToolbar, IonTitle, IonContent, IonHeader, CommonModule],
})
export class DetalleCuentaComponent implements OnInit {
  pedidosCliente: Pedido[] = [];
  importeTotal: number = 0;
  propina: number = 0;
  mostrarSpinner: boolean = false;
  satisfaccion: string = 'Regular';
  cliente: Cliente | undefined = undefined;
  idMesa: number = 0;

  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private router: Router,
    
  ) {}

  async ngOnInit() {
    try {
      this.mostrarSpinner = true;

      const usuario = await this.usuarioService.getUsuarioBd();
      if (usuario instanceof Cliente) {
        this.cliente = usuario;

        this.pedidoService.traerTodosObservable().subscribe((l) => {
          const fa = l.filter((p) => p.idCliente === usuario.id);
          this.pedidosCliente = fa;
          this.obtenerPrecioTotal(usuario);
          this.asignarSatisfaccion();
        });
      }

      console.log(this.importeTotal);
    } catch (error: any) {
      Swalert.toastError(error);
      console.log(error);
    } finally {
      this.mostrarSpinner = false;
    }
  }

  obtenerPrecioTotal(cliente: Cliente) {
    this.pedidosCliente.forEach((p) => {
      this.importeTotal += p.precio;
      console.log(this.importeTotal);
    });
    this.propina = (this.importeTotal * cliente.propina) / 100;
    this.importeTotal += this.propina;
  }

  private asignarSatisfaccion() {
    let propinaString = this.propina.toString();

    switch (this.cliente?.propina) {
      case 20:
        this.satisfaccion = 'Excelente';
        break;
      case 15:
        this.satisfaccion = 'Muy bueno';
        break;
      case 10:
        this.satisfaccion = 'Bueno';
        break;
      case 5:
        this.satisfaccion = 'Regular';
        break;
      default:
        this.satisfaccion = 'Malo';
        break;
    }
  }

  async pagar() {
    console.log('Iniciando pago');
    const modificaciones = this.pedidosCliente.map(async (p) => {
      p.estado = Estado.pedidoPagado;
      this.idMesa = p.idMesa;
      console.log(p.estado);
      await this.pedidoService.modificar(p);
    });

    console.log(modificaciones);
    await Promise.all(modificaciones);
    this.router.navigateByUrl(`simular-pago/${this.idMesa}`);
  }
}
