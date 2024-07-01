import { Usuario } from './padres/usuario';

export class Supervisor extends Usuario {
  public cuil: number;

  constructor() {
    super();
    this.rol = 'supervisor';
    this.cuil = 0;
  }

  setId(id: number) {
    this.id = id;
  }
  setCuil(cuil: number) {
    this.cuil = cuil;
  }

  static toDoc(supervisor: Supervisor) {
    return {
      id: supervisor.id.toString(),
      nombre: supervisor.nombre,
      apellido: supervisor.apellido,
      dni: supervisor.dni.toString(),
      cuil: supervisor.cuil.toString(),
      foto: supervisor.foto,
      rol: supervisor.rol,
      habilitado: supervisor.habilitado,
      correo: supervisor.correo,
      token: supervisor.token,
    };
  }
  static parseDoc(doc: any) {
    let supervisor = new Supervisor();
    supervisor.id = Number(doc.id);
    supervisor.nombre = doc.nombre;
    supervisor.apellido = doc.apellido;
    supervisor.dni = Number(doc.dni);
    supervisor.cuil = Number(doc.cuil);
    supervisor.foto = doc.foto;
    supervisor.rol = doc.rol;
    supervisor.habilitado = JSON.parse(doc.habilitado);
    supervisor.correo = doc.correo;
    supervisor.token = doc.token;
    return supervisor;
  }
  static parseDocArray(doc: any) {
    let supervisor = new Supervisor();
    supervisor.id = Number(doc['id']);
    supervisor.nombre = doc['nombre'];
    supervisor.apellido = doc['apellido'];
    supervisor.dni = Number(doc['dni']);
    supervisor.cuil = Number(doc['cuil']);
    supervisor.foto = doc['foto'];
    supervisor.rol = doc['rol'];
    supervisor.habilitado = doc['habilitado'];
    supervisor.correo = doc['correo'];
    supervisor.token = doc['token'];
    return supervisor;
  }
}
