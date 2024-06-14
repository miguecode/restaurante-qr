import { Usuario } from './padres/usuario';

export class Duenio extends Usuario {
  public cuil: number;
  correoVerificado: boolean;

  constructor() {
    super();
    this.rol = 'duenio';
    this.cuil = 0;
    this.correoVerificado = false;
  }

  setCuil(cuil: number) {
    this.cuil = cuil;
  }

  static toDoc(duenio: Duenio) {
    return {
      id: duenio.id.toString(),
      nombre: duenio.nombre,
      apellido: duenio.apellido,
      dni: duenio.dni.toString(),
      cuil: duenio.cuil.toString(),
      foto: duenio.foto,
      rol: duenio.rol,
      correoVerificado: duenio.correoVerificado.toString(),
      correo: duenio.correo,
    };
  }
  static parseDoc(doc: any) {
    let duenio = new Duenio();
    duenio.id = Number(doc.id);
    duenio.nombre = doc.nombre;
    duenio.apellido = doc.apellido;
    duenio.dni = Number(doc.dni);
    duenio.cuil = Number(doc.cuil);
    duenio.foto = doc.foto;
    duenio.rol = doc.rol;
    duenio.correoVerificado = JSON.parse(doc.correoVerificado);
    duenio.correo = doc.correo;
    return duenio;
  }
  static parseDocArray(doc: any) {
    let duenio = new Duenio();
    duenio.id = Number(doc['id']);
    duenio.nombre = doc['nombre'];
    duenio.apellido = doc['apellido'];
    duenio.dni = Number(doc['dni']);
    duenio.cuil = Number(doc['cuil']);
    duenio.foto = doc['foto'];
    duenio.rol = doc['rol'];
    duenio.correoVerificado = JSON.parse(doc['correoVerificado']);
    duenio.correo = doc['correo'];
    return duenio;
  }
}
