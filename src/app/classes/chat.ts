export class Chat {
  public id: number;
  public idCliente: number;
  public mensajes: any[]; // { emisor, texto, fechaEnvio }

  constructor() {
    this.id = 0;
    this.idCliente = 0;
    this.mensajes = [];
  }

  static toDoc(chat: Chat) {
    return {
      id: chat.id.toString(),
      idCliente: chat.idCliente.toString(),
      mensajes: JSON.stringify(chat.mensajes),
    };
  }
  static parseDoc(doc: any) {
    let chat = new Chat();
    chat.id = Number(doc.id);
    chat.idCliente = Number(doc.idCliente);
    chat.mensajes = JSON.parse(doc.mensajes);
    return chat;
  }
  static parseDocArray(doc: any) {
    let chat = new Chat();
    chat.id = Number(doc['id']);
    chat.idCliente = Number(doc['idCliente']);
    chat.mensajes = JSON.parse(doc['mensajes']);
    return chat;
  }
}
