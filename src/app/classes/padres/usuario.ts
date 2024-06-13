export class Usuario {
  nombre: string;
  apellido: string;
  dni: string;
  foto: string;
  public id?: string;

  constructor(
    nombre: string,
    apellido: string,
    dni: string,
    foto: string,
    id?: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.foto = foto;
    this.id = id;
  }
}
