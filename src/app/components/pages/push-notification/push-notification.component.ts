import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Empleado } from 'src/app/classes/empleado';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { ApiService } from 'src/app/services/api/api.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
  standalone: true,
  imports: [RouterLink, JsonPipe],
})
export class PushNotificationComponent implements OnInit {
  inputValue: string = 'esperando';
  responseValue: any = 'esperando';
  constructor(
    private apiService: ApiService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {}

  public async notificar() {
    try {
      await this.usuarioService.iniciarSesion(
        UsuarioService.ACCESOS_RAPIDOS[0]
      );

      let e = new Empleado();
      e.nombre = 'kevin';
      e.token = '';
      //'eJze0zyIQh60-wgVh26VfS:APA91bE2Nsh5-yz06txuE9JmV5arTYChM3J6YZGoRkn9yUTxAzJpJQ9GvkRoR7gy5-WliuhJdk4uaJcQF2ECsrpqrw8zQ3YndZtZLHH8RfolHYmAbcpEetPxMFeNbh5xO0wxv-GINbzN';

      let r = await this.apiService.notificarUnUsuario(e, `Hola ${e.nombre}`);
      this.responseValue = await r.json();

      await Swalert.toastSuccess(JSON.stringify(this.responseValue));
      console.log(this.responseValue);
    } catch (e: any) {
      this.responseValue = e;
      await Swalert.toastError(e.message);
      console.log(e.message);
    }
  }
  public async enviarCorreo(aceptacion: boolean) {
    try {
      let e = new Empleado();
      e.nombre = 'juan pablo';
      e.correo = 'juanpid29@gmail.com';

      let r = await this.apiService.enviarCorreo(e, aceptacion);
      this.responseValue = await r.json();

      await Swalert.toastSuccess(JSON.stringify(this.responseValue));
      console.log(this.responseValue);
    } catch (e: any) {
      this.responseValue = e;
      await Swalert.toastError(e.message);
      console.log(e.message);
    }
  }
}
