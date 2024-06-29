import { url } from 'inspector';

export class Usuario {
  public id: number;
  public nombre: string;
  public apellido: string;
  public dni: number;
  public foto: string;
  public file: any; // Seguramente este file sea un blob, luego en el servicio cloud-storage de alguna manera lo parsea a formato imagen
  public rol: string;
  public habilitado: boolean;
  public correo: string;
  public clave: string;
  public token: string;

  constructor() {
    this.id = 0;
    this.rol = '';
    this.nombre = '';
    this.apellido = '';
    this.dni = 0;
    this.foto = '';
    this.file = undefined;
    this.habilitado = false;
    this.correo = '';
    this.clave = '';
    this.token = '';
  }

  setNombre(nombre: string) {
    this.nombre = nombre.toLowerCase();
  }
  setApellido(apellido: string) {
    this.apellido = apellido.toLowerCase();
  }
  setDni(dni: number) {
    this.dni = dni;
  }
  setUrlFoto(urlFoto: string) {
    this.foto = urlFoto;
  }
  setFile(file: any) {
    this.file = file;
  }
  setCorreo(correo: string) {
    this.correo = correo.toLowerCase();
  }
  setClave(clave: string) {
    this.clave = clave;
  }

  setToken(token: string) {
    this.token = token;
  }
}
