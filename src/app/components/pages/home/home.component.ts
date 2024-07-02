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
import { Duenio } from 'src/app/classes/duenio';
import { Empleado } from 'src/app/classes/empleado';
import { Supervisor } from 'src/app/classes/supervisor';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SeccionAbmsComponent } from './seccion-abms/seccion-abms.component';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { Producto } from 'src/app/classes/producto';
import { Mesa } from 'src/app/classes/mesa';
import { MesaService } from 'src/app/services/mesa.service';
import { ProductoService } from 'src/app/services/producto.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DuenioService } from 'src/app/services/duenio.service';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { filter, firstValueFrom, isObservable } from 'rxjs';
import { BarcodeScanningService } from 'src/app/services/utils/barcode-scanning.service';
import { TraductorQr } from 'src/app/classes/utils/traductor-qr';
import { PushNotificationService } from 'src/app/services/utils/push-notification.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
    SeccionAbmsComponent,
  ],
})
export class HomeComponent implements OnInit {
  usuario: Usuario | Cliente | undefined = undefined;
  mostrarSpinner: boolean = false;
  mostrarAbms: boolean = false;

  listaDuenios: Duenio[] = [];
  listaSupervisores: Supervisor[] = [];
  listaEmpleados: Empleado[] = [];
  listaClientes: Cliente[] = [];
  listaMesas: Mesa[] = [];
  listaProductos: Producto[] = [];

  usuarioEsEmpleado: boolean = false;
  usuarioEsEsDuenio: boolean = false;
  usuarioEsSupervisor: boolean = false;
  usuarioEsCliente: boolean = false;
  usuarioTipoEmpleado: string = '';

  usuarioEstaEnListaEspera: boolean = false;
  usuarioTieneMesa: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private duenioService: DuenioService,
    private supervisorService: SupervisorService,
    private empleadoService: EmpleadoService,
    private clienteSerivice: ClienteService,
    private mesaService: MesaService,
    private productoService: ProductoService,
    private barcodeScanningService: BarcodeScanningService,
    private router: Router,
    private apiServ: ApiService
  ) {
    this.duenioService.traerTodosObservable().subscribe((l) => {
      this.listaDuenios = l;
    });

    this.supervisorService.traerTodosObservable().subscribe((l) => {
      this.listaSupervisores = l;
    });

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

  private async cargarDatosImportantes() {
    this.usuario = await this.usuarioService.getUsuarioBd();

    this.usuarioEsEsDuenio = this.usuario instanceof Duenio;
    this.usuarioEsSupervisor = this.usuario instanceof Supervisor;
    this.usuarioEsEmpleado = this.usuario instanceof Empleado;
    this.usuarioEsCliente = this.usuario instanceof Cliente;

    if (this.usuario instanceof Empleado) {
      this.usuarioTipoEmpleado = this.usuario.tipo;
    }

    if (this.usuario instanceof Cliente) {
      this.usuarioEstaEnListaEspera = this.usuario.estadoListaEspera;
      this.usuario.idMesa !== 0
        ? (this.usuarioTieneMesa = true)
        : (this.usuarioTieneMesa = false);
    }

    console.log('listaDuenios', this.listaDuenios);
    console.log('listaSupervisores', this.listaSupervisores);
    console.log('listaEmpleados', this.listaEmpleados);
    console.log('listaClientes', this.listaClientes);
    console.log('listaMesas', this.listaMesas);
    console.log('listaProductos', this.listaProductos);

    console.log('usuarioEsEsDuenio', this.usuarioEsEsDuenio);
    console.log('usuarioEsSupervisor', this.usuarioEsSupervisor);
    console.log('usuarioEsEmpleado', this.usuarioEsEmpleado);
    console.log('usuarioEsCliente', this.usuarioEsCliente);

    console.log('usuarioTipoEmpleado', this.usuarioTipoEmpleado);

    console.log('usuario', this.usuario);
  }

  async ngOnInit() {
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

  async cerrarSesion() {
    await this.usuarioService.cerrarSesion();
    this.router.navigateByUrl('/login');
  }

  async escanearQrMesa() {
    const dataQr = await this.barcodeScanningService.escanearQr();
    const usuario = await this.usuarioService.getUsuarioBd();
    const source = TraductorQr.mesa(dataQr);

    try {
      await Swalert.toastSuccess(source.toString());
      if (source !== false) {
        if (usuario instanceof Cliente) {
          await this.mesaService.accesoDeClientePorQrMesa(source, usuario);
        } else if (usuario instanceof Empleado) {
          await this.mesaService.accesoDeEmpleadoPorQrMesa(source, usuario);
        }
      }
    } catch (e: any) {
      Swalert.toastError(e.message);
    }
  }
  async escanearQrIngresoLocal() {
    const dataQr = await this.barcodeScanningService.escanearQr();
    // Swalert.toastSuccess(TraductorQr.ingresoLocal(dataQr).toString());

    if (
      TraductorQr.ingresoLocal(dataQr) &&
      this.usuario !== undefined &&
      this.usuario instanceof Cliente
    ) {
      await this.apiServ.notificarEmpleados(
        Empleado.T_METRE,
        'Un nuevo cliente se anotó en la lista de espera'
      );
      this.usuario.estadoListaEspera = true;
      this.usuario.fechaListaEspera = new Date();
      await this.clienteSerivice.modificarDoc(this.usuario);
      await Swalert.toastSuccess(
        'Te registraste en la Lista de Espera correctamente'
      );
    } else {
      await Swalert.toastError('El QR escaneado no es correcto');
    }
  }
}
