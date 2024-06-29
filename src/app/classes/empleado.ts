import { Usuario } from './padres/usuario';

export class Empleado extends Usuario {
  public cuil: number;
  public tipo: string;
  public token: string;

  public static TIPOS = [
    'cocinero',
    'bartender',
    'repartidor',
    'mozo',
    'metre',
  ];
  public static T_COCINERO: string = Empleado.TIPOS[0];
  public static T_BARTENDER: string = Empleado.TIPOS[1];
  public static T_REPARTIDOR: string = Empleado.TIPOS[2];
  public static T_MOZO: string = Empleado.TIPOS[3];
  public static T_METRE: string = Empleado.TIPOS[4];

  constructor() {
    super();
    this.rol = 'empleado';
    this.cuil = 0;
    this.tipo = '';
    this.token = '';
  }

  setId(id: number) {
    this.id = id;
  }
  setCuil(cuil: number) {
    this.cuil = cuil;
  }
  setTipo(tipo: string) {
    this.tipo = tipo.toLowerCase();
  }

  static toDoc(empleado: Empleado) {
    return {
      id: empleado.id.toString(),
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      dni: empleado.dni.toString(),
      cuil: empleado.cuil.toString(),
      foto: empleado.foto,
      tipo: empleado.tipo,
      rol: empleado.rol,
      habilitado: empleado.habilitado.toString(),
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
    empleado.tipo = doc.tipo;
    empleado.rol = doc.rol;
    empleado.habilitado = JSON.parse(doc.habilitado);
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
    empleado.tipo = doc['tipo'];
    empleado.rol = doc['rol'];
    empleado.habilitado = JSON.parse(doc['habilitado']);
    empleado.correo = doc['correo'];
    return empleado;
  }
}
