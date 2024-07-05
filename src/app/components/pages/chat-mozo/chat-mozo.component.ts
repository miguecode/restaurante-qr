import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import {
  IonHeader,
  IonToolbar,
  IonFooter,
  IonItem,
  IonButton,
  IonIcon,
  IonContent,
  IonLabel,
} from '@ionic/angular/standalone';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cliente } from 'src/app/classes/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { firstValueFrom, isObservable } from 'rxjs';
import { Empleado } from 'src/app/classes/empleado';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Duenio } from 'src/app/classes/duenio';
import { Supervisor } from 'src/app/classes/supervisor';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-chat-mozo',
  templateUrl: './chat-mozo.component.html',
  styleUrls: ['./chat-mozo.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonContent,
    IonIcon,
    IonButton,
    IonItem,
    IonFooter,
    IonToolbar,
    IonHeader,
    FormsModule,
    NgIf,
    NgFor,
    NgClass,
    DatePipe,
    RouterLink,
  ],
})
export class ChatMozoComponent implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  listaMensajes: any[] = [];
  inputMensaje: any = '';
  deshabilitarBotonEnviar: boolean = false;
  mostrarSpinner: boolean = false;
  usuario: Usuario | undefined = undefined;
  idClienteParametros: number | undefined = undefined;

  constructor(
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private pushService : ApiService
  ) {}

  async ngOnInit() {
    this.mostrarSpinner = true;

    const obs = this.route.params;
    if (isObservable(obs)) {
      const paramsPromise = await firstValueFrom(obs);
      this.idClienteParametros = Number(paramsPromise['idCliente']);

      const u: Usuario = await this.usuarioService.getUsuarioBd();
      if (u !== undefined) {
        this.usuario = u;
      }

      this.chatService.traerTodosObservable().subscribe(async (l) => {
        const c = l.find(
          (c) =>
            this.usuario !== undefined &&
            c.idCliente === this.idClienteParametros
        );

        if (c !== undefined) {
          this.listaMensajes = c.mensajes;
        }
        this.actualizarScroll();
        this.mostrarSpinner = false;
      });
    }
  }

  async enviarMensaje() {
    if (
      this.inputMensaje !== '' &&
      this.usuario !== undefined &&
      this.idClienteParametros !== undefined
    ) {
      await this.pushService.notificarMozoMensaje(Empleado.T_MOZO, `Un cliente ha realizado una nueva consulta`);
      await this.chatService.enviarMensaje(
        this.idClienteParametros,
        this.inputMensaje
      );
      this.actualizarScroll();
      this.inputMensaje = '';
    }
  }

  actualizarScroll() {
    setTimeout(() => {
      this.content?.scrollToBottom(300);
    }, 25);
  }
}
