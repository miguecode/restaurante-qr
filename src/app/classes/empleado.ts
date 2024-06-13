import { Usuario } from '../classes/padres/usuario';

export class Empleado extends Usuario {
  cuil: string;
  tipo: string;

  constructor(
    nombre: string,
    apellido: string,
    dni: string,
    foto: string,
    cuil: string,
    tipo: string
  ) {
    super(nombre, apellido, dni, foto);
    this.cuil = cuil;
    this.tipo = tipo;
  }
}
