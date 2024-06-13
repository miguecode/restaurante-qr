import { Usuario } from './padres/usuario';

export class Empleado extends Usuario {
  cuil: string;

  constructor() {
    super();
  }
  static toDoc(empleado: Empleado) {
    return {
      id: empleado.id.toString(),
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      dni: empleado.dni.toString(),
      cuil: empleado.cuil.toString(),
      foto: empleado.foto,
      rol: empleado.rol,
      correoVerificado: empleado.correoVerificado.toString(),
      correo: empleado.correo,
    };
  }
  static parseDoc(doc: any) {
    let empleado = new Empleado();
    empleado.id = Number(doc.id);
    empleado.nombre = doc.nombre;
    empleado.apellido = doc.apellido;
    empleado.dni = Number(doc.dni);
    empleado.cuil = Number(doc.cuil);
    empleado.foto = doc.foto;
    empleado.rol = doc.rol;
    empleado.correoVerificado = JSON.parse(doc.correoVerificado);
    empleado.correo = doc.correo;
    return empleado;
  }
  static parseDocArray(doc: any) {
    let empleado = new Empleado();
    empleado.id = Number(doc['id']);
    empleado.nombre = doc['nombre'];
    empleado.apellido = doc['apellido'];
    empleado.dni = Number(doc['dni']);
    empleado.cuil = Number(doc['cuil']);
    empleado.foto = doc['foto'];
    empleado.rol = doc['rol'];
    empleado.correoVerificado = JSON.parse(doc['correoVerificado']);
    empleado.correo = doc['correo'];
    return empleado;
  }
}