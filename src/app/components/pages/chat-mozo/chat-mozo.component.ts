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
  cliente: Cliente | undefined = undefined;

  constructor(
    private clienteService: ClienteService,
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.mostrarSpinner = true;

    const obs = this.route.params;
    if (isObservable(obs)) {
      const paramsPromise = await firstValueFrom(obs);
      const l = await this.clienteService.traerTodos();

      const c = l.find((c) => c.id === Number(paramsPromise['idCliente']));

      if (c !== undefined) {
        this.cliente = c;
      }

      this.chatService.traerTodosObservable().subscribe(async (l) => {
        const c = l.find(
          (c) => this.cliente !== undefined && c.idCliente === this.cliente.id
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
    if (this.inputMensaje !== '' && this.cliente !== undefined) {
      await this.chatService.enviarMensaje(this.cliente.id, this.inputMensaje);
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
