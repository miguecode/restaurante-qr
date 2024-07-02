import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/classes/cliente';
import { Mesa } from 'src/app/classes/mesa';
import { ClienteService } from 'src/app/services/cliente.service';
import { MesaService } from 'src/app/services/mesa.service';
import {
  IonHeader,
  IonToolbar,
  IonFooter,
  IonContent,
} from '@ionic/angular/standalone';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Swalert } from 'src/app/classes/utils/swalert.class';

@Component({
  selector: 'app-asignar-mesa-cliente-qr',
  templateUrl: './asignar-mesa-cliente-qr.component.html',
  styleUrls: ['./asignar-mesa-cliente-qr.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonFooter,
    IonToolbar,
    IonHeader,
    CapitalizePipe,
    NgFor,
    NgIf,
    RouterLink,
  ],
})
export class AsignarMesaClienteQrComponent implements OnInit {
  cliente: Cliente | undefined = undefined;
  mesa: Mesa | undefined = undefined;
  constructor(
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private mesaService: MesaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(async (p) => {
      this.mesa = await this.mesaService.traerPorId(Number(p['idMesa']));

      const u = await this.usuarioService.getUsuarioBd();

      if (u instanceof Cliente) {
        this.cliente = u;
      }
    });
  }

  ngOnInit() {
    console.log('');
  }

  async vincular() {
    if (this.mesa === undefined || this.cliente === undefined) {
      return;
    }

    this.mesa.setCliente(this.cliente);
    await this.mesaService.modificar(this.mesa);
    this.cliente.estadoListaEspera = false;
    await this.clienteService.modificar(this.cliente);
    Swalert.toastSuccess('Mesa asignada correctamente');
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 1500);
  }
}
