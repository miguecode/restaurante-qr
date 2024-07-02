import { Usuario } from './padres/usuario';
import { Estado } from './utils/enumerado';

export class Cliente extends Usuario {
  estado: Estado;
  estadoListaEspera: boolean;
  fechaListaEspera: Date;
  // La idea seria que cuando se escanea el qr de lista de espera, se cambie el estadoListaEspera a true, y se inicialize la fecha del momento
  idMesa: number;

  constructor() {
    super();
    this.estado = Estado.pendiente;
    this.rol = 'cliente';
    this.estadoListaEspera = false;
    this.fechaListaEspera = new Date();
    this.idMesa = 0;
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
      estado: cliente.estado,
      estadoListaEspera: cliente.estadoListaEspera.toString(),
      fechaListaEspera: cliente.fechaListaEspera.toISOString(),
      token: cliente.token,
      idMesa: cliente.idMesa,
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
    cliente.estado = doc.estado;
    cliente.estadoListaEspera = JSON.parse(doc.estadoListaEspera);
    cliente.fechaListaEspera = new Date(doc.fechaListaEspera);
    cliente.token = doc.token;
    cliente.idMesa = doc.idMesa;
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
    cliente.estado = doc['estado'];
    cliente.estadoListaEspera = JSON.parse(doc['estadoListaEspera']);
    cliente.fechaListaEspera = new Date(doc['fechaListaEspera']);
    cliente.token = doc['token'];
    cliente.idMesa = doc['idMesa'];
    return cliente;
  }
}
