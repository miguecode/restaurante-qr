export class Pregunta {
  public pregunta: string;
  public respuestas: string[];

  constructor(pregunta: string, respuestas: string[]) {
    this.pregunta = pregunta;
    this.respuestas = respuestas;
  }
}
