import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { Supervisor } from '../classes/supervisor';
import { AuthService } from './firebase/auth.service';
import { CloudStorageService } from './firebase/cloud-storage.service';
import { firstValueFrom, isObservable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  private col = 'supervisores';
  private carpeta = 'supervisores';

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private cloudStorageService: CloudStorageService
  ) {}

  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }
  private async registrarAuth(supervisor: Supervisor) {
    try {
      await this.authService.registrar(supervisor.correo, supervisor.clave);
    } catch (e) {
      throw new Error('Ya existe un usuario con ese correo');
    }
  }
  private cerrarSesionAuth() {
    return this.authService.cerrarSesion();
  }
  private async setId(supervisor: Supervisor) {
    const id = await this.traerProximoId();
    if (id === undefined) {
      throw new Error('El ID fue null');
    }
    supervisor.id = id;
  }
  private async insertarFoto(supervisor: Supervisor) {
    const nombreArchivo = supervisor.id.toString();

    await this.cloudStorageService.subirArchivoUri(
      this.carpeta,
      nombreArchivo,
      supervisor.file
    );

    const fotoUrl = await this.cloudStorageService.traerUrlPorNombre(
      nombreArchivo,
      this.carpeta
    );
    if (fotoUrl === undefined) {
      throw new Error('Hubo un problema al recuperar la URL de la foto');
    }
    supervisor.foto = fotoUrl;
  }
  private async insertarDoc(supervisor: Supervisor) {
    const doc = Supervisor.toDoc(supervisor);
    return this.firestoreService.insertarConId(doc.id, doc, this.col);
  }

  public async alta(supervisor: Supervisor) {
    try {
      await this.registrarAuth(supervisor);
      await this.cerrarSesionAuth();
      await this.setId(supervisor);
      await this.insertarFoto(supervisor); // !OJO! el file que se le asigna a la entidad debe ser [Uri]
      await this.insertarDoc(supervisor);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }

  public traerTodosObservable() {
    return this.firestoreService.traerTodos(this.col);
  }
  public async traerTodosPromise() {
    const supervisoresObservable = this.traerTodosObservable();
    if (isObservable(supervisoresObservable)) {
      return firstValueFrom(supervisoresObservable);
    }

    return undefined;
  }
  public traerPorIdObservable(supervisor: Supervisor) {
    const doc = Supervisor.toDoc(supervisor);
    return this.firestoreService.traerPorId(doc.id, this.col);
  }
  public async traerPorIdPromise(supervisor: Supervisor) {
    const supervisorObservable = this.traerPorIdObservable(supervisor);
    if (isObservable(supervisorObservable)) {
      return firstValueFrom(supervisorObservable);
    }

    return undefined;
  }
}
