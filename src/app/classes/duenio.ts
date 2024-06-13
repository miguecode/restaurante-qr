import { Usuario } from '../classes/padres/usuario';

export class Duenio extends Usuario {
  cuil: string;
  perfil: string;

  constructor(
    nombre: string,
    apellido: string,
    dni: string,
    foto: string,
    cuil: string,
    perfil: string
  ) {
    super(nombre, apellido, dni, foto);
    this.cuil = cuil;
    this.perfil = perfil;
  }
}
