import { url } from 'inspector';

export class Producto {
  public id: number;
  public nombre: string;
  public descripcion: string;
  public tiempo: number;
  public precio: number;
  public fotoUno: string;
  public fotoDos: string;
  public fotoTres: string;
  public fileUno: any;
  public fileDos: any;
  public fileTres: any;
  public qr: string;

  public constructor() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.tiempo = 0;
    this.precio = 0;
    this.fotoUno = '';
    this.fotoDos = '';
    this.fotoTres = '';
    this.fileUno = undefined;
    this.fileDos = undefined;
    this.fileTres = undefined;
    this.qr = '';
  }

  public static toDoc(producto: Producto) {
    return {
      id: producto.id.toString(),
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      tiempo: producto.tiempo.toString(),
      precio: producto.precio.toString(),
      fotoUno: producto.fotoUno,
      fotoDos: producto.fotoDos,
      fotoTres: producto.fotoTres,
      qr: producto.qr,
    };
  }

  public static parseDoc(doc: any) {
    let producto = new Producto();
    producto.id = Number(doc.id);
    producto.nombre = doc.nombre;
    producto.descripcion = doc.descripcion;
    producto.tiempo = Number(doc.tiempo);
    producto.precio = Number(doc.precio);
    producto.fotoUno = doc.fotoUno;
    producto.fotoDos = doc.fotoDos;
    producto.fotoTres = doc.fotoTres;
    producto.qr = doc.qr;
    return producto;
  }

  public static parseDocArray(doc: any) {
    let producto = new Producto();
    producto.id = Number(doc['id']);
    producto.nombre = doc['nombre'];
    producto.descripcion = doc['descripcion'];
    producto.tiempo = Number(doc['tiempo']);
    producto.precio = Number(doc['precio']);
    producto.fotoUno = doc['fotoUno'];
    producto.fotoDos = doc['fotoDos'];
    producto.fotoTres = doc['fotoTres'];
    producto.qr = doc['qr'];
    return producto;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setNombre(nombre: string) {
    this.nombre = nombre;
  }

  public setDescripcion(descripcion: string) {
    this.descripcion = descripcion;
  }

  public setTiempo(tiempo: number) {
    this.tiempo = tiempo;
  }

  public setPrecio(precio: number) {
    this.precio = precio;
  }

  public setFileUno(file: any) {
    this.fileUno = file;
  }

  public setFileDos(file: any) {
    this.fileDos = file;
  }

  public setFileTres(file: any) {
    this.fileTres = file;
  }

  public setUrlFotoUno(urlFoto: string) {
    this.fotoUno = urlFoto;
  }

  public setUrlFotoDos(urlFoto: string) {
    this.fotoDos = urlFoto;
  }

  public setUrlFotoTres(urlFoto: string) {
    this.fotoTres = urlFoto;
  }
}
