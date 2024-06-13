import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { firstValueFrom, isObservable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  public traerTodos(col: string) {
    const colRef = collection(this.firestore, col);
    return collectionData(colRef);
  }

  public traerPorId(docId: string, col: string) {
    const colRef = collection(this.firestore, col);
    const docRef = doc(colRef, docId);
    return docData(docRef);
  }

  public insertar(docData: any, col: string) {
    const colRef = collection(this.firestore, col);
    return addDoc(colRef, docData);
  }

  public insertarConId(docId: string, docData: any, col: string) {
    const docuRef = doc(this.firestore, col + `/${docId}`);
    return setDoc(docuRef, docData);
  }

  public modificar(docId: string, docData: any, col: string) {
    const colRef = collection(this.firestore, col);
    const docRef = doc(colRef, docId);
    return updateDoc(docRef, docData);
  }

  public eliminar(docId: string, col: string) {
    const colRef = collection(this.firestore, col);
    const docRef = doc(colRef, docId);
    return deleteDoc(docRef);
  }

  public async traerProximoId(col: string, nombreAtributoId: string) {
    const listaResponse = this.traerTodos(col);
    if (isObservable(listaResponse)) {
      const lista: any = await firstValueFrom(listaResponse);
      if (lista && lista.length > 0) {
        lista.sort(
          (a: any, b: any) => b[nombreAtributoId] - a[nombreAtributoId]
        );
        return Number(lista[0][nombreAtributoId]) + 1;
      } else {
        return 1;
      }
    }
    return null;
  }
}
