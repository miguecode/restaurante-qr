export class Usuario {
  public id: number;
  public nombre: string;
  public apellido: string;
  public dni: number;
  public foto: string;
  public file: any; // Seguramente este file sea un blob, luego en el servicio cloud-storage de alguna manera lo parsea a formato imagen
  public rol: string;
  public correo: string;
  public clave: string;

  constructor() {
    this.id = 0;
    this.rol = '';
    this.nombre = '';
    this.apellido = '';
    this.dni = 0;
    this.foto = '';
    this.file = undefined;
    this.correo = '';
    this.clave = '';
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
  setFile(file: any) {
    this.file = file;
  }
  setCorreo(correo: string) {
    this.correo = correo.toLowerCase();
  }
  setClave(clave: string) {
    this.clave = clave;
  }
}
