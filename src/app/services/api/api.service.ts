import { Injectable } from '@angular/core';
import { Mesa } from 'src/app/classes/mesa';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Producto } from 'src/app/classes/producto';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private consumirLocal: boolean = false;
  private comandaApiWeb: string =
    'https://sp-restaurante-brigada-binaria-api.onrender.com';
  private localPuerto: string = '4000';

  constructor(private usuarioService: UsuarioService) {}

  public async generarQrIngresoLocal() {
    return new Promise<any>((resolver) => {
      const URL_ENDPOINT = `https://quickchart.io/qr?format=base64&margin=1&text=sprestaurante@ingresolocal`;
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          resolver({
            png: `data:image/png;base64,${xhttp.responseText}`,
            base64: xhttp.responseText,
          });
        }
      };
      xhttp.open('GET', URL_ENDPOINT, true);
      xhttp.send();
    });
  }

  public async generarQrMesa(mesa: Mesa) {
    return new Promise<any>((resolver) => {
      const URL_ENDPOINT = `https://quickchart.io/qr?format=base64&margin=1&text=mesa@${mesa.id}`;
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          resolver({
            png: `data:image/png;base64,${xhttp.responseText}`,
            base64: xhttp.responseText,
          });
        }
      };
      xhttp.open('GET', URL_ENDPOINT, true);
      xhttp.send();
    });
  }
  public async generarQrProducto(producto: Producto) {
    return new Promise<any>((resolver) => {
      const URL_ENDPOINT = `https://quickchart.io/qr?format=base64&margin=1&text=producto@${producto.id}`;
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          resolver({
            png: `data:image/png;base64,${xhttp.responseText}`,
            base64: xhttp.responseText,
          });
        }
      };
      xhttp.open('GET', URL_ENDPOINT, true);
      xhttp.send();
    });
  }

  public async enviarCorreo(receptor: Usuario, aceptacion: boolean) {
    const LOCALHOST = `http://localhost:${this.localPuerto}/enviar-correo`;
    const HOSTING = `${this.comandaApiWeb}/enviar-correo`;
    return fetch(this.consumirLocal ? LOCALHOST : HOSTING, {
      method: 'POST',
      body: JSON.stringify({
        aceptacion: aceptacion,
        nombreUsuario: receptor.nombre,
        mail: receptor.correo,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  public async notificarUnUsuario(usuario: Usuario, mensaje: string) {
    const usuarioLogeado = await this.usuarioService.getUsuarioBd();
    const LOCALHOST = `http://localhost:${this.localPuerto}/notificar-uno`;
    const HOSTING = `${this.comandaApiWeb}/notificar-uno`;
    return fetch(this.consumirLocal ? LOCALHOST : HOSTING, {
      method: 'POST',
      body: JSON.stringify({
        title: `Mensaje de ${usuarioLogeado.correo}`,
        body: mensaje,
        token: usuario.token,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  public async notificarEmpleados(tipoEmpleado: string, mensaje: string) {
    const usuario = await this.usuarioService.getUsuarioBd();
    const LOCALHOST = `http://localhost:${this.localPuerto}/notificar-empleados`;
    const HOSTING = `${this.comandaApiWeb}/notificar-empleados`;
    return fetch(this.consumirLocal ? LOCALHOST : HOSTING, {
      method: 'POST',
      body: JSON.stringify({
        title: `Mensaje de ${usuario.correo}`,
        body: mensaje,
        employeeType: tipoEmpleado,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  public async notificarDuenios(mensaje: string) {
    const usuario = await this.usuarioService.getUsuarioBd();
    const LOCALHOST = `http://localhost:${this.localPuerto}/notificar-duenios`;
    const HOSTING = `${this.comandaApiWeb}/notificar-duenios`;
    return fetch(this.consumirLocal ? LOCALHOST : HOSTING, {
      method: 'POST',
      body: JSON.stringify({
        title: `Mensaje de ${usuario.correo}`,
        body: mensaje,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  public async notificarSupervisores(mensaje: string) {
    const usuario = await this.usuarioService.getUsuarioBd();
    const LOCALHOST = `http://localhost:${this.localPuerto}/notificar-supervisores`;
    const HOSTING = `${this.comandaApiWeb}/notificar-supervisores`;
    return fetch(this.consumirLocal ? LOCALHOST : HOSTING, {
      method: 'POST',
      body: JSON.stringify({
        title: `Mensaje de ${usuario.correo}`,
        body: mensaje,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  public async notificarClientes(mensaje: string) {
    const usuario = await this.usuarioService.getUsuarioBd();
    const LOCALHOST = `http://localhost:${this.localPuerto}/notificar-clientes`;
    const HOSTING = `${this.comandaApiWeb}/notificar-clientes`;
    return fetch(this.consumirLocal ? LOCALHOST : HOSTING, {
      method: 'POST',
      body: JSON.stringify({
        title: `Mensaje de ${usuario.correo}`,
        body: mensaje,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public async notificarRegistro() {
    const LOCALHOST = `http://localhost:${this.localPuerto}/notificar-duenios`;
    const HOSTING = `${this.comandaApiWeb}/notificar-duenios`;
    return fetch(this.consumirLocal ? LOCALHOST : HOSTING, {
      method: 'POST',
      body: JSON.stringify({
        title: `Mensaje del sistema`,
        body: `Se registro un nuevo cliente.`,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
