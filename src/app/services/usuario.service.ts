import { Injectable } from '@angular/core';
import { Empleado } from '../classes/empleado';
import { Supervisor } from '../classes/supervisor';
import { Duenio } from '../classes/duenio';
import { Cliente } from '../classes/cliente';
import { DuenioService } from './duenio.service';
import { SupervisorService } from './supervisor.service';
import { AuthService } from './firebase/auth.service';
import { EmpleadoService } from './empleado.service';
import { ClienteService } from './cliente.service';
import { Usuario } from '../classes/padres/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public static ACCESOS_RAPIDOS: Usuario[] = [
    { correo: 'jp@jp.com', clave: '111111' } as Usuario,
    { correo: 'mg@mg.com', clave: '111111' } as Usuario,
    { correo: 'st@st.com', clave: '111111' } as Usuario,
  ];
  private duenios: Duenio[] = [];
  private supervisores: Supervisor[] = [];
  private empleados: Empleado[] = [];
  private clientes: Cliente[] = [];
  private flagObservables: boolean[] = [false, false, false, false];

  constructor(
    private authService: AuthService,
    private duenioService: DuenioService,
    private supervisorService: SupervisorService,
    private empleadoService: EmpleadoService,
    private clienteService: ClienteService
  ) {
    this.duenioService.traerTodosObservable().subscribe((l) => {
      this.duenios = l;
      this.flagObservables[0] = true;
    });

    this.supervisorService.traerTodosObservable().subscribe((l) => {
      this.supervisores = l;
      this.flagObservables[1] = true;
    });

    this.empleadoService.traerTodosObservable().subscribe((l) => {
      this.empleados = l;
      this.flagObservables[2] = true;
    });

    this.clienteService.traerTodosObservable().subscribe((l) => {
      this.clientes = l;
      this.flagObservables[3] = true;
    });
  }

  private traerTodos() {
    return new Promise<(Duenio | Supervisor | Empleado | Cliente)[]>(
      (resolver) => {
        if (
          this.flagObservables[0] === true &&
          this.flagObservables[1] === true &&
          this.flagObservables[2] === true &&
          this.flagObservables[3] === true
        ) {
          resolver([
            ...this.duenios,
            ...this.supervisores,
            ...this.empleados,
            ...this.clientes,
          ]);
        }

        setTimeout(() => {
          resolver([
            ...this.duenios,
            ...this.supervisores,
            ...this.empleados,
            ...this.clientes,
          ]);
        }, 5000); // Este valor se puede bajar, pero no mucho
      }
    );
  }
  private async iniciarSesionAuth(usuario: Usuario) {
    try {
      await this.authService.iniciarSesion(usuario.correo, usuario.clave);
    } catch (e) {
      throw new Error('No existe el usuario');
    }
  }
  private async cerrarSesionAuth() {
    return this.authService.cerrarSesion();
  }
  public async getCorreoAuth() {
    const correo = await this.authService.getCorreo();
    if (correo === undefined) {
      throw new Error('El usuario no se logeo o hay lentitud de conexion');
    }

    return correo;
  }
  public async getVerificoCorreoAuth() {
    const verificoCorreo = await this.authService.getVerificoCorreo();
    if (verificoCorreo === undefined) {
      throw new Error('El usuario no se logeo o hay lentitud de conexion');
    }

    return verificoCorreo;
  }
  public async getUsuarioBd() {
    const correo = await this.getCorreoAuth();
    const lista = await this.traerTodos();
    let usuario: (Duenio | Supervisor | Empleado | Cliente) | undefined =
      undefined;

    for (let item of lista) {
      if (item.correo === correo) {
        usuario = item;
        break;
      }
    }

    if (usuario === undefined) {
      throw new Error(
        'El usuario no existe en la base de datos o hay lentitud en la conexion'
      );
    }

    return usuario;
  }
  public async getRol() {
    const usuario = await this.getUsuarioBd();
    if (usuario === undefined) {
      throw new Error(
        'El usuario no existe en la base de datos o hay lentitud de conexion'
      );
    }

    return usuario.rol;
  }

  public async cerrarSesion() {
    return this.cerrarSesionAuth();
  }
  public async iniciarSesion(usuario: Usuario) {
    try {
      await this.iniciarSesionAuth(usuario);

      /* Aca se valida si verifico su correo, lo dejo comentado porque al hacer el Alta todavia no envia el correo de verficacion
      const verificoCorreoAuth = await this.getVerificoCorreoAuth();
      if (verificoCorreoAuth === false) {
        throw new Error('Todavia no verificaste tu correo');
      }
      */

      /* Aca se valida si fue habilitado o no por la entidad superior (jefe), todavia no me fije bien en el pdf como es eso, pero lo dejo comentado.
      const usuarioBd = await this.getUsuarioBd();
      if (usuarioBd instanceof Empleado && usuarioBd.habilitado === false) {
        throw new Error('Tu cuenta se encuentra deshabilitada');
      }
      */
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }
}
