import { Injectable } from '@angular/core';
import { AuthService } from './firebase/auth.service';
import { FirestoreService } from './firebase/firestore.service';
import { CloudStorageService } from './firebase/cloud-storage.service';
import { Cliente } from '../classes/cliente';
import { firstValueFrom, isObservable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

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
  
  private async registrarAuth(cliente: Cliente) {
    try {
      await this.authService.registrar(cliente.correo, cliente.clave);
    } catch (e) {
      throw new Error('Ya existe un usuario con ese correo');
    }
  }

  private cerrarSesionAuth() {
    return this.authService.cerrarSesion();
  }

  private async setId(cliente: Cliente) {
    const id = await this.traerProximoId();
    if (id === undefined) {
      throw new Error('El ID fue null');
    }
    cliente.id = id;
  }

  private async insertarFoto(cliente: Cliente) {
    const nombreArchivo = cliente.id.toString();

    await this.cloudStorageService.subirArchivoUri(
      this.carpeta,
      nombreArchivo,
      cliente.file
    );

    const fotoUrl = await this.cloudStorageService.traerUrlPorNombre(
      nombreArchivo,
      this.carpeta
    );
    if (fotoUrl === undefined) {
      throw new Error('Hubo un problema al recuperar la URL de la foto');
    }
    cliente.foto = fotoUrl;
  }

  private async insertarDoc(cliente: Cliente) {
    const doc = Cliente.toDoc(cliente);
    return this.firestoreService.insertarConId(doc.id, doc, this.col);
  }

  public async alta(cliente: Cliente) {
    try {
      await this.registrarAuth(cliente);
      await this.cerrarSesionAuth();
      await this.setId(cliente);
      await this.insertarFoto(cliente); // !OJO! el file que se le asigna a la entidad debe ser [Uri]
      await this.insertarDoc(cliente);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }

  public traerTodosObservable() {
    return this.firestoreService.traerTodos(this.col);
  }

  public async traerTodosPromise() {
    const clienteObservable = this.traerTodosObservable();
    if (isObservable(clienteObservable)) {
      return firstValueFrom(clienteObservable);
    }

    return undefined;
  }

  public traerPorIdObservable(cliente: Cliente) {
    const doc = Cliente.toDoc(cliente);
    return this.firestoreService.traerPorId(doc.id, this.col);
  }
  public async traerPorIdPromise(cliente: Cliente) {
    const clienteObservable = this.traerPorIdObservable(cliente);
    if (isObservable(clienteObservable)) {
      return firstValueFrom(clienteObservable);
    }

    return undefined;
  }
}
