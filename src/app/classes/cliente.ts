import { Usuario } from './padres/usuario';

export class Cliente extends Usuario {
  correoVerificado: boolean;

  constructor() {
    super();
    this.correoVerificado = false;
    this.rol = 'cliente';
  }

  setId(id: number) {
    this.id = id;
  }

  static toDoc(cliente: Cliente) {
    return {
      id: cliente.id.toString(),
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      dni: cliente.dni.toString(),
      foto: cliente.foto,
      rol: cliente.rol,
      habilitado: cliente.habilitado,
      correo: cliente.correo,
      token: cliente.token,
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
    cliente.habilitado = JSON.parse(doc.habilitado);
    cliente.correo = doc.correo;
    cliente.correo = doc.correo;
    cliente.token = doc.token;
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
    cliente.habilitado = doc['habilitado'];
    cliente.correo = doc['correo'];
    cliente.token = doc['token'];
    return cliente;
  }
}
