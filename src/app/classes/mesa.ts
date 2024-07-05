import { url } from 'inspector';
import { Cliente } from './cliente';

export class Mesa {
  public id: number;
  public cantidadClientes: number;
  public cantidadMaxima: number;
  public tipo: string;
  public foto: string;
  public file: any;
  public qr: string;

  public static TIPOS = ['vip', 'discapacitados', 'estandar'];
  public static M_VIP: string = Mesa.TIPOS[0];
  public static M_DISCAPACITADOS: string = Mesa.TIPOS[1];
  public static M_ESTANDAR: string = Mesa.TIPOS[2];

  public idCliente: number;
  public nombreCliente: string;
  public apellidoCliente: string;

  public encuestaRealizada: boolean;

  public constructor() {
    this.id = 0;
    this.cantidadClientes = 0;
    this.cantidadMaxima = 0;
    this.tipo = '';
    this.foto = '';
    this.file = undefined;
    this.qr = '';

    this.idCliente = 0;
    this.nombreCliente = '';
    this.apellidoCliente = '';

    this.encuestaRealizada = false;
  }

  public static toDoc(mesa: Mesa) {
    return {
      id: mesa.id.toString(),
      cantidadClientes: mesa.cantidadClientes.toString(),
      cantidadMaxima: mesa.cantidadMaxima.toString(),
      tipo: mesa.tipo,
      foto: mesa.foto,
      qr: mesa.qr,

      idCliente: mesa.idCliente,
      nombreCliente: mesa.nombreCliente,
      apellidoCliente: mesa.apellidoCliente,

      encuestaRealizada: JSON.stringify(mesa.encuestaRealizada),
    };
  }
  public static parseDoc(doc: any) {
    let mesa = new Mesa();
    mesa.id = Number(doc.id);
    mesa.cantidadClientes = Number(doc.cantidadClientes);
    mesa.cantidadMaxima = Number(doc.cantidadMaxima);
    mesa.tipo = doc.tipo;
    mesa.foto = doc.foto;
    mesa.qr = doc.qr;

    mesa.idCliente = doc.idCliente;
    mesa.nombreCliente = doc.nombreCliente;
    mesa.apellidoCliente = doc.apellidoCliente;

    mesa.encuestaRealizada = JSON.parse(doc.encuestaRealizada);
    return mesa;
  }
  public static parseDocArray(doc: any) {
    let mesa = new Mesa();
    mesa.id = Number(doc['id']);
    mesa.cantidadClientes = Number(doc['cantidadClientes']);
    mesa.cantidadMaxima = Number(doc['cantidadMaxima']);
    mesa.tipo = doc['tipo'];
    mesa.foto = doc['foto'];
    mesa.qr = doc['qr'];

    mesa.idCliente = doc['idCliente'];
    mesa.nombreCliente = doc['nombreCliente'];
    mesa.apellidoCliente = doc['apellidoCliente'];

    mesa.encuestaRealizada = JSON.parse(doc['encuestaRealizada']);
    return mesa;
  }

  public setId(id: number) {
    this.id = id;
  }
  public setCantidadClientes(cantidadCLientes: number) {
    this.cantidadClientes = cantidadCLientes;
  }
  public setCantidadMaxima(cantidadMaxima: number) {
    this.cantidadMaxima = cantidadMaxima;
  }
  public setTipo(tipo: string) {
    this.tipo = tipo.toLowerCase();
  }
  public setFile(file: any) {
    this.file = file;
  }
  public setUrlFoto(urlFoto: string) {
    this.foto = urlFoto;
  }

  public setCliente(cliente: Cliente) {
    this.idCliente = cliente.id;
    this.nombreCliente = cliente.nombre;
    this.apellidoCliente = cliente.apellido;
  }
}
