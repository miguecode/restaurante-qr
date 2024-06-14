import { Usuario } from './padres/usuario';

export class Cliente extends Usuario {
  correoVerificado: boolean;

  constructor() {
    super();
    this.correoVerificado = false;
  }
  static toDoc(cliente: Cliente) {
    return {
      id: cliente.id.toString(),
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      dni: cliente.dni.toString(),
      foto: cliente.foto,
      rol: cliente.rol,
      correoVerificado: cliente.correoVerificado.toString(),
      correo: cliente.correo,
    };
  }
  static parseDoc(doc: any) {
    let cliente = new Cliente();
    cliente.id = Number(doc.id);
    cliente.nombre = doc.nombre;
    cliente.apellido = doc.apellido;
    cliente.dni = Number(doc.dni);
    cliente.foto = doc.foto;
    cliente.rol = doc.rol;
    cliente.correoVerificado = JSON.parse(doc.correoVerificado);
    cliente.correo = doc.correo;
    return cliente;
  }
  static parseDocArray(doc: any) {
    let cliente = new Cliente();
    cliente.id = Number(doc['id']);
    cliente.nombre = doc['nombre'];
    cliente.apellido = doc['apellido'];
    cliente.dni = Number(doc['dni']);
    cliente.foto = doc['foto'];
    cliente.rol = doc['rol'];
    cliente.correoVerificado = JSON.parse(doc['correoVerificado']);
    cliente.correo = doc['correo'];
    return cliente;
  }
}
