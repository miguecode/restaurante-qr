import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { Encuesta } from '../classes/encuesta';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  private col = 'encuestas';
  private encuestas: Encuesta[] = [];
  private flagObservable: boolean = false;

  constructor(private firestoreService: FirestoreService) {
    this.traerTodosObservable().subscribe((l) => {
      this.encuestas = l;
      this.flagObservable = true;
    });
  }

  private traerTodos() {
    return new Promise<Encuesta[]>((resolver) => {
      if (this.flagObservable === true) {
        resolver(this.encuestas);
      }

      setTimeout(() => {
        resolver(this.encuestas);
      }, 5000);
    });
  }

  public async traerPorId(idEncuesta: number) {
    const encuestas = await this.traerTodos();
    for (let encuesta of encuestas) {
      if (encuesta.id === idEncuesta) {
        return encuesta;
      }
    }
    return undefined;
  }

  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }

  private async setId(encuesta: Encuesta) {
    const id = await this.traerProximoId();
    if (id === undefined) {
      throw new Error('Hubo un problema al calcular el ID');
    }
    encuesta.id = id;
  }

  private async insertarDoc(encuesta: Encuesta) {
    const doc = Encuesta.toDoc(encuesta);
    return this.firestoreService.insertarConId(this.col, doc.id, doc);
  }

  private async modificarDoc(encuesta: Encuesta) {
    const doc = Encuesta.toDoc(encuesta);
    await this.firestoreService.modificar(this.col, doc.id, doc);
  }

  private async eliminarDoc(encuesta: Encuesta) {
    const doc = Encuesta.toDoc(encuesta);
    await this.firestoreService.eliminar(this.col, doc.id);
  }

  public async alta(encuesta: Encuesta) {
    await this.setId(encuesta);
    await this.insertarDoc(encuesta);
    return encuesta;
  }

  public async baja(encuesta: Encuesta) {
    await this.eliminarDoc(encuesta);
  }

  public async modificar(encuesta: Encuesta) {
    await this.modificarDoc(encuesta);
  }

  public traerTodosObservable(): Observable<Encuesta[]> {
    return this.firestoreService
      .traerTodos(this.col)
      .pipe(map((listaDocs) => listaDocs.map((p) => Encuesta.parseDoc(p))));
  }

  public traerPorIdObservable(encuesta: Encuesta): Observable<Encuesta> {
    const doc = Encuesta.toDoc(encuesta);
    return this.firestoreService
      .traerPorId(this.col, doc.id)
      .pipe(map((doc) => Encuesta.parseDoc(doc)));
  }
}
