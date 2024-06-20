import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { Duenio } from '../classes/duenio';
import { AuthService } from './firebase/auth.service';
import { CloudStorageService } from './firebase/cloud-storage.service';
import { firstValueFrom, isObservable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DuenioService {
  private col = 'duenios';
  private carpeta = 'duenios';

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private cloudStorageService: CloudStorageService
  ) {}

  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }
  private async registrarAuth(duenio: Duenio) {
    try {
      await this.authService.registrar(duenio.correo, duenio.clave);
    } catch (e) {
      throw new Error('Ya existe un usuario con ese correo');
    }
  }
  private cerrarSesionAuth() {
    return this.authService.cerrarSesion();
  }
  private async setId(duenio: Duenio) {
    const id = await this.traerProximoId();
    if (id === undefined) {
      throw new Error('El ID fue null');
    }
    duenio.id = id;
  }
  private async insertarFoto(duenio: Duenio) {
    const nombreArchivo = duenio.id.toString();

    await this.cloudStorageService.subirArchivoUri(
      this.carpeta,
      nombreArchivo,
      duenio.file
    );

    const fotoUrl = await this.cloudStorageService.traerUrlPorNombre(
      nombreArchivo,
      this.carpeta
    );
    if (fotoUrl === undefined) {
      throw new Error('Hubo un problema al recuperar la URL de la foto');
    }
    duenio.foto = fotoUrl;
  }
  private async insertarDoc(duenio: Duenio) {
    const doc = Duenio.toDoc(duenio);
    return this.firestoreService.insertarConId(doc.id, doc, this.col);
  }

  public async alta(duenio: Duenio) {
    try {
      await this.registrarAuth(duenio);
      await this.cerrarSesionAuth();
      await this.setId(duenio);
      await this.insertarFoto(duenio); // !OJO! el file que se le asigna a la entidad debe ser [Uri]
      await this.insertarDoc(duenio);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }

  public traerTodosObservable() {
    return this.firestoreService.traerTodos(this.col);
  }
  public async traerTodosPromise() {
    const dueniosObservable = this.traerTodosObservable();
    if (isObservable(dueniosObservable)) {
      return firstValueFrom(dueniosObservable);
    }

    return undefined;
  }
  public traerPorIdObservable(duenio: Duenio) {
    const doc = Duenio.toDoc(duenio);
    return this.firestoreService.traerPorId(doc.id, this.col);
  }
  public async traerPorIdPromise(duenio: Duenio) {
    const duenioObservable = this.traerPorIdObservable(duenio);
    if (isObservable(duenioObservable)) {
      return firstValueFrom(duenioObservable);
    }

    return undefined;
  }
}
