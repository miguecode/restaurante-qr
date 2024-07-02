import { Producto } from './producto';
import { Estado } from './utils/enumerado';

export class Pedido {
  public id: number;
  public idProducto: number;
  public tipo: string;
  public tiempo: number;
  //public cantidad: number;
  public precio: number;
  public confirmadoMozo: boolean;
  public estado: Estado;

  constructor() {
    this.id = 0;
    this.idProducto = 0;
    this.tipo = '';
    this.tiempo = 0;
    //this.cantidad = 0;
    this.precio = 0;
    this.confirmadoMozo = false;
    this.estado = Estado.undefined;
  }

  public static toDoc(pedido: Pedido) {
    return {
      id: pedido.id.toString(),
      idProducto: pedido.idProducto,
      tipo: pedido.tipo,
      tiempo: pedido.tiempo.toString(),
      //cantidad: pedido.cantidad.toString(),
      precio: pedido.precio,
      confirmadoMozo: pedido.confirmadoMozo,
      estado: pedido.estado,
    };
  }

  public static parseDoc(doc: any) {
    let pedido = new Pedido();
    pedido.id = Number(doc.id);
    pedido.idProducto = doc.idProducto;
    pedido.tipo = doc.tipo;
    pedido.tiempo = Number(doc.tiempo);
    //pedido.cantidad = Number(doc.cantidad);
    pedido.precio = doc.precio;
    pedido.confirmadoMozo = doc.confirmadoMozo;
    return pedido;
  }

  public static parseDocArray(doc: any) {
    let pedido = new Pedido();
    pedido.id = Number(doc['id']);
    pedido.idProducto = doc['idProducto'];
    pedido.tipo = doc['tipo'];
    pedido.tiempo = Number(doc['tiempo']);
    //pedido.cantidad = Number(doc['cantidad']);
    pedido.precio = doc['precio'];
    pedido.confirmadoMozo = doc['confirmadoMozo'];
    return pedido;
  }

  setProducto(producto: Producto /*, cantidad ???*/) {
    this.idProducto = producto.id;
    this.tipo = producto.tipo;
    this.tiempo = producto.tiempo;
    //this.cantidad = ???
    this.precio = producto.precio;
  }
}
