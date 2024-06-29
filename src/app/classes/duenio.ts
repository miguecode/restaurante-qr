import { Usuario } from './padres/usuario';

export class Duenio extends Usuario {
  public cuil: number;

  constructor() {
    super();
    this.rol = 'duenio';
    this.cuil = 0;
  }

  setId(id: number) {
    this.id = id;
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
      habilitado: duenio.habilitado,
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
    duenio.habilitado = JSON.parse(doc.habilitado);
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
    duenio.habilitado = doc['habilitado'];
    duenio.correo = doc['correo'];
    return duenio;
  }
}
