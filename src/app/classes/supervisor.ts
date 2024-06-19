import { Usuario } from './padres/usuario';

export class Supervisor extends Usuario {
  public cuil: number;

  constructor() {
    super();
    this.rol = 'supervisor';
    this.cuil = 0;
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
      correo: supervisor.correo,
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
    supervisor.correo = doc.correo;
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
    supervisor.correo = doc['correo'];
    return supervisor;
  }
}
