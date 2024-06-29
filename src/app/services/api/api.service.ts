import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesa } from 'src/app/classes/mesa';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Producto } from 'src/app/classes/producto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

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

  public async generarQrProducto(producto: Producto) {
    return new Promise<any>((resolver) => {
      const URL_ENDPOINT = `https://quickchart.io/qr?format=base64&margin=1&text=${producto.id}`;
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
    const ENDPOINT = `https://sp-restaurante-brigada-binaria-api.onrender.com/send-mail`;
    return fetch(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        aceptacion: aceptacion,
        nombreUsuario: receptor.nombre,
        mail: receptor.correo,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
