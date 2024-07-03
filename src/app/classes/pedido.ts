import { Producto } from './producto';
import { Estado } from './utils/enumerado';

export class Pedido {
  public id: number;
  public idProducto: number;
  public idCliente: number;
  public idMesa: number;
  public tipo: string;
  public tiempo: number;
  // public cantidad: number;
  public precio: number;
  public confirmadoMozo: boolean;
  public estado: Estado;

  public fotoUnoProducto: string;
  public fotoDosProducto: string;
  public fotoTresProducto: string;
  public nombreProducto: string;
  public descripcionProducto: string;

  constructor() {
    this.id = 0;
    this.idProducto = 0;
    this.idCliente = 0;
    this.idMesa = 0;
    this.tipo = '';
    this.tiempo = 0;
    // this.cantidad = 0;
    this.precio = 0;
    this.confirmadoMozo = false;
    this.estado = Estado.undefined;

    this.fotoUnoProducto = '';
    this.fotoDosProducto = '';
    this.fotoTresProducto = '';
    this.nombreProducto = '';
    this.descripcionProducto = '';
  }

  public static toDoc(pedido: Pedido) {
    return {
      id: pedido.id.toString(),
      idProducto: pedido.idProducto.toString(),
      idCliente: pedido.idCliente.toString(),
      idMesa: pedido.idMesa.toString(),
      tipo: pedido.tipo,
      tiempo: pedido.tiempo.toString(),
      // cantidad: pedido.cantidad.toString(),
      precio: pedido.precio,
      confirmadoMozo: pedido.confirmadoMozo,
      estado: pedido.estado,

      fotoUnoProducto: pedido.fotoUnoProducto,
      fotoDosProducto: pedido.fotoDosProducto,
      fotoTresProducto: pedido.fotoTresProducto,
      nombreProducto: pedido.nombreProducto,
      descripcionProducto: pedido.descripcionProducto,
    };
  }

  public static parseDoc(doc: any) {
    let pedido = new Pedido();
    pedido.id = Number(doc.id);
    pedido.idProducto = Number(doc.idProducto);
    pedido.idCliente = Number(doc.idCliente);
    pedido.idMesa = Number(doc.idMesa);
    pedido.tipo = doc.tipo;
    pedido.tiempo = Number(doc.tiempo);
    // pedido.cantidad = Number(doc.cantidad);
    pedido.precio = doc.precio;
    pedido.confirmadoMozo = doc.confirmadoMozo;

    pedido.fotoUnoProducto = doc.fotoUnoProducto;
    pedido.fotoDosProducto = doc.fotoDosProducto;
    pedido.fotoTresProducto = doc.fotoTresProducto;
    pedido.nombreProducto = doc.nombreProducto;
    pedido.descripcionProducto = doc.descripcionProducto;
    return pedido;
  }

  public static parseDocArray(doc: any) {
    let pedido = new Pedido();
    pedido.id = Number(doc['id']);
    pedido.idProducto = Number(doc['idProducto']);
    pedido.idCliente = Number(doc['idCliente']);
    pedido.idMesa = Number(doc['idMesa']);
    pedido.tipo = doc['tipo'];
    pedido.tiempo = Number(doc['tiempo']);
    // pedido.cantidad = Number(doc['cantidad']);
    pedido.precio = doc['precio'];
    pedido.confirmadoMozo = doc['confirmadoMozo'];

    pedido.fotoUnoProducto = doc['fotoUnoProducto'];
    pedido.fotoDosProducto = doc['fotoDosProducto'];
    pedido.fotoTresProducto = doc['fotoTresProducto'];
    pedido.nombreProducto = doc['nombreProducto'];
    pedido.descripcionProducto = doc['descripcionProducto'];
    return pedido;
  }

  setProducto(producto: Producto /*, cantidad ???*/) {
    this.idProducto = producto.id;
    this.tipo = producto.tipo;
    this.tiempo = producto.tiempo;
    // this.cantidad = ???
    this.estado = Estado.pendiente;
    this.precio = producto.precio;

    this.fotoUnoProducto = producto.fotoUno;
    this.fotoDosProducto = producto.fotoDos;
    this.fotoTresProducto = producto.fotoTres;
    this.nombreProducto = producto.nombre;
    this.descripcionProducto = producto.descripcion;
  }
}
