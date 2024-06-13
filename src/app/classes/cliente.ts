import { Usuario } from '../classes/padres/usuario';

export class Cliente extends Usuario {
  constructor(nombre: string, apellido: string, dni: string, foto: string) {
    super(nombre, apellido, dni, foto);
  }
}
