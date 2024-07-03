import { Usuario } from './padres/usuario';
import { Pregunta } from './utils/pregunta';

export class Encuesta {
  public id: number;
  public idUsuario: number;
  public preguntas: (Pregunta | any)[];
  public respuestas: string[];
  public fecha: Date;

  constructor() {
    this.id = 0;
    this.idUsuario = 0;
    this.preguntas = [
      new Pregunta(
        '¿Cómo calificarías la calidad de la comida que recibiste?',
        ['excelente', 'buena', 'regular', 'mala']
      ),
      new Pregunta('¿Qué tan satisfecho(a) estás con el servicio al cliente?', [
        'muy satisfecho(a)',
        'satisfecho(a)',
        'insatisfecho(a)',
        'muy insatisfecho(a)',
      ]),
      new Pregunta('¿Qué tan limpio y ordenado te pareció el restaurante?', [
        'muy limpio y ordenado',
        'limpio y ordenado',
        'sucio y desordenado',
        'muy sucio y desordenado',
      ]),
      new Pregunta(
        '¿Qué tan razonables te parecieron los precios en relación con la calidad de la comida y el servicio?',
        ['muy razonables', 'razonables', 'regular', 'muy caros']
      ),
      new Pregunta(
        '¿Recomendarías nuestro restaurante a un amigo o familiar?',
        [
          'definitivamente sí',
          'Probablemente sí',
          'probablemente no',
          'definitivamente no',
        ]
      ),
    ];
    this.respuestas = [];
    this.fecha = new Date();
  }

  static toDoc(encuesta: Encuesta) {
    return {
      id: encuesta.id.toString(),
      idUsuario: encuesta.idUsuario.toString(),
      preguntas: JSON.stringify(encuesta.preguntas),
      respuestas: JSON.stringify(encuesta.respuestas),
      fecha: encuesta.fecha.toISOString(),
    };
  }

  static parseDoc(doc: any) {
    let encuesta = new Encuesta();
    encuesta.id = Number(doc.id);
    encuesta.idUsuario = Number(doc.idUsuario);
    encuesta.preguntas = JSON.parse(doc.preguntas);
    encuesta.respuestas = JSON.parse(doc.respuestas);
    return encuesta;
  }

  static parseDocArray(doc: any) {
    let encuesta = new Encuesta();
    encuesta.id = Number(doc['id']);
    encuesta.idUsuario = Number(doc['idUsuario']);
    encuesta.preguntas = JSON.parse(doc['preguntas']);
    encuesta.respuestas = JSON.parse(doc['respuestas']);
    return encuesta;
  }

  setUsuario(usuario: Usuario) {
    this.idUsuario = usuario.id;
  }
}
