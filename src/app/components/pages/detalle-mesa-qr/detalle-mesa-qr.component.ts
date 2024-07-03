import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { Cliente } from 'src/app/classes/cliente';
import { Empleado } from 'src/app/classes/empleado';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { Producto } from 'src/app/classes/producto';
import { Mesa } from 'src/app/classes/mesa';
import { MesaService } from 'src/app/services/mesa.service';
import { ProductoService } from 'src/app/services/producto.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { filter } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-detalle-mesa-qr',
  templateUrl: './detalle-mesa-qr.component.html',
  styleUrls: ['./detalle-mesa-qr.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonLabel,
    IonButton,
    FormsModule,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    MenuComponent,
  ],
})
export class DetalleMesaQrComponent implements OnInit {
  usuario: Usuario | Cliente | undefined = undefined;
  mostrarSpinner: boolean = false;
  mostrarMenu: boolean = false;
  mostrarEstado: boolean = false;

  listaEmpleados: Empleado[] = [];
  listaClientes: Cliente[] = [];
  listaMesas: Mesa[] = [];
  listaProductos: Producto[] = [];

  usuarioEsCliente: boolean = false;
  usuarioEstaEnListaEspera: boolean = false;
  usuarioTieneMesa: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private empleadoService: EmpleadoService,
    private clienteSerivice: ClienteService,
    private mesaService: MesaService,
    private productoService: ProductoService,
    private router: Router
  ) {
    this.empleadoService.traerTodosObservable().subscribe((l) => {
      this.listaEmpleados = l;
    });

    this.clienteSerivice.traerTodosObservable().subscribe((l) => {
      this.listaClientes = l;
    });

    this.mesaService.traerTodosObservable().subscribe((l) => {
      this.listaMesas = l;
    });

    this.productoService.traerTodosObservable().subscribe((l) => {
      this.listaProductos = l;
    });
  }

  ngOnInit() {
    try {
      this.mostrarSpinner = true;
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(async () => {
          try {
            this.mostrarSpinner = true;
            await this.cargarDatosImportantes();
          } catch (e: any) {
            Swalert.toastError(e.message);
            console.log(e.message);
          } finally {
            this.mostrarSpinner = false;
          }
        });
    } catch (e: any) {
      Swalert.toastError(e.message);
      console.log(e.message);
    }
  }

  private async cargarDatosImportantes() {
    this.usuario = await this.usuarioService.getUsuarioBd();
    this.usuarioEsCliente = this.usuario instanceof Cliente;

    if (this.usuario instanceof Cliente) {
      this.usuarioEstaEnListaEspera = this.usuario.estadoListaEspera;
      this.usuario.idMesa !== 0
        ? (this.usuarioTieneMesa = true)
        : (this.usuarioTieneMesa = false);
    }
  }

  public async clienteToChatMozo() {
    if (this.usuario === undefined) {
      this.usuario = await this.usuarioService.getUsuarioBd();
    }

    if (this.usuario instanceof Cliente) {
      this.router.navigateByUrl(`/chat-mozo/${this.usuario.id}`);
    }
  }
}
