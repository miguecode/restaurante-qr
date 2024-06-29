import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from 'src/app/classes/empleado';
import { Mesa } from 'src/app/classes/mesa';
import { UsuarioService } from '../usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  public async generarQrMesa(mesa: Mesa) {
    return new Promise<any>((resolver) => {
      const URL_ENDPOINT = `https://quickchart.io/qr?format=base64&margin=1&text=${mesa.id}`;
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

  private async notificarUnEmpleado(empleado: Empleado, tipo: string) {
    const usuario = await this.usuarioService.getUsuarioBd();
    const ENDPOINT = `https://sp-restaurante-brigada-binaria-api.onrender.com/notify`;
    return fetch(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        title: `${usuario.rol}:${usuario.correo}`,
        body: `Probando notificarUnEmpleado() a ${empleado.nombre}`,
        token:
          'eJze0zyIQh60-wgVh26VfS:APA91bE2Nsh5-yz06txuE9JmV5arTYChM3J6YZGoRkn9yUTxAzJpJQ9GvkRoR7gy5-WliuhJdk4uaJcQF2ECsrpqrw8zQ3YndZtZLHH8RfolHYmAbcpEetPxMFeNbh5xO0wxv-GINbzN',
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  public async notificarCocinero(empleado: Empleado) {
    return this.notificarUnEmpleado(empleado, Empleado.T_COCINERO);
  }
  public async notificarBartender(empleado: Empleado) {
    return this.notificarUnEmpleado(empleado, Empleado.T_BARTENDER);
  }
  public async notificarRepartidor(empleado: Empleado) {
    return this.notificarUnEmpleado(empleado, Empleado.T_REPARTIDOR);
  }
  public async notificarMozo(empleado: Empleado) {
    return this.notificarUnEmpleado(empleado, Empleado.T_MOZO);
  }
  public async notificarMetre(empleado: Empleado) {
    return this.notificarUnEmpleado(empleado, Empleado.T_METRE);
  }
}
