import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { Chat } from '../classes/chat';
import { map } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Cliente } from '../classes/cliente';
import { Empleado } from '../classes/empleado';
import { ApiService } from './api/api.service';
import { ClienteService } from './cliente.service';
import { Usuario } from '../classes/padres/usuario';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public col = 'chats';
  private listaChat: Chat[] = [];
  private flagObservable: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    private apiService: ApiService
  ) {
    this.traerTodosObservable().subscribe((l) => {
      this.listaChat = l;
      this.flagObservable = true;
    });
  }

  private traerTodos() {
    return new Promise<Chat[]>((resolver) => {
      if (this.flagObservable === true) {
        resolver(this.listaChat);
      }

      setTimeout(() => {
        resolver(this.listaChat);
      }, 5000); // Este valor se puede bajar, pero no mucho
    });
  }
  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }
  private async setId(chat: Chat) {
    const id = await this.traerProximoId();
    if (id === undefined) {
      throw new Error('Hubo un problema al calcular el ID');
    }
    chat.id = id;
  }
  private async insertarDoc(chat: Chat) {
    const doc = Chat.toDoc(chat);
    console.log(doc);
    return this.firestoreService.insertarConId(this.col, doc.id, doc);
  }
  public async modificarDoc(chat: Chat) {
    const doc = Chat.toDoc(chat);
    await this.firestoreService.modificar(this.col, doc.id, doc);
  }
  private async eliminarDoc(chat: Chat) {
    const doc = Chat.toDoc(chat);
    await this.firestoreService.eliminar(this.col, doc.id);
  }

  public async alta(idCliente: number) {
    let chat = new Chat();
    chat.idCliente = idCliente;
    await this.setId(chat);
    await this.insertarDoc(chat);
  }

  public async enviarMensaje(idCliente: number, texto: string) {
    const usuario = await this.usuarioService.getUsuarioBd();
    const lista = await this.traerTodos();

    let c = lista.find((c) => c.idCliente === idCliente);

    if (c === undefined) {
      let chat = new Chat();
      chat.idCliente = idCliente;

      if (usuario instanceof Cliente) {
        await this.apiService.notificarMozoMensaje(Empleado.T_MOZO, texto);
        chat.mensajes.push({
          esCliente: true,
          esMozo: false,
          idMesa: usuario.idMesa,
          nombre: usuario.nombre,
          emisor: usuario.correo,
          texto: texto,
          fechaEnvio: new Date(),
        });
      }

      if (usuario instanceof Empleado && usuario.tipo === Empleado.T_MOZO) {
        const cliente = await this.clienteService.traerPorId(idCliente);
        await this.apiService.notificarUnUsuario(cliente as Usuario, texto);
        chat.mensajes.push({
          esCliente: false,
          esMozo: true,
          tipo: Empleado.T_MOZO,
          nombre: usuario.nombre,
          emisor: usuario.correo,
          texto: texto,
          fechaEnvio: new Date(),
        });
      }

      await this.setId(chat);
      await this.insertarDoc(chat);
    }

    if (c !== undefined) {
      if (usuario instanceof Cliente) {
        await this.apiService.notificarMozoMensaje(Empleado.T_MOZO, texto);
        c.mensajes.push({
          esCliente: true,
          esMozo: false,
          idMesa: usuario.idMesa,
          nombre: usuario.nombre,
          emisor: usuario.correo,
          texto: texto,
          fechaEnvio: new Date(),
        });
      }

      if (usuario instanceof Empleado && usuario.tipo === Empleado.T_MOZO) {
        const cliente = await this.clienteService.traerPorId(idCliente);
        await this.apiService.notificarUnUsuario(cliente as Usuario, texto);
        c.mensajes.push({
          esCliente: false,
          esMozo: true,
          tipo: Empleado.T_MOZO,
          nombre: usuario.nombre,
          emisor: usuario.correo,
          texto: texto,
          fechaEnvio: new Date(),
        });
      }

      await this.modificarDoc(c);
    }
  }

  public traerTodosObservable() {
    return this.firestoreService
      .traerTodos(this.col)
      .pipe(map((listaDocs) => listaDocs.map((e) => Chat.parseDoc(e))));
  }
  public traerPorIdObservable(chat: Chat) {
    const doc = Chat.toDoc(chat);
    return this.firestoreService
      .traerPorId(this.col, doc.id)
      .pipe(map((doc) => Chat.parseDoc(doc)));
  }
}
