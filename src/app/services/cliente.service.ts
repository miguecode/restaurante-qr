import { Injectable } from '@angular/core';
import { AuthService } from './firebase/auth.service';
import { FirestoreService } from './firebase/firestore.service';
import { CloudStorageService } from './firebase/cloud-storage.service';
import { Cliente } from '../classes/cliente';
import { firstValueFrom, isObservable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private col = 'clientes';
  private carpeta = 'clientes';
  private clientes: Cliente[] = [];
  private flagObservable: boolean = false;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private cloudStorageService: CloudStorageService
  ) {
    this.traerTodosObservable().subscribe((l) => {
      this.clientes = l;
      this.flagObservable = true;
    });
  }

  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }

  private async registrarAuth(cliente: Cliente) {
    try {
      await this.authService.registrar(cliente.correo, cliente.clave);
    } catch (e : any) {
      throw new Error(e.message);
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
      // Aca estaba el error, se estaba pasando el nombre del archivo antes que el de la carpeta
      this.carpeta,
      nombreArchivo,
      cliente.file
    );

    const fotoUrl = await this.cloudStorageService.traerUrlPorNombre(
      this.carpeta,
      nombreArchivo
    );
    if (fotoUrl === undefined) {
      throw new Error('Hubo un problema al recuperar la URL de la foto');
    }
    cliente.foto = fotoUrl;
  }

  private async insertarDoc(cliente: Cliente) {
    const doc = Cliente.toDoc(cliente);
    return this.firestoreService.insertarConId(this.col, doc.id, doc);
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

  private async modificarFoto(cliente: Cliente) {
    if (cliente.file !== undefined && cliente.file !== null) {
      await this.insertarFoto(cliente);
    }
  }

  private async modificarDoc(cliente: Cliente) {
    const doc = Cliente.toDoc(cliente);
    await this.firestoreService.modificar(this.col, doc.id, doc);
  }

  public async modificar(cliente: Cliente) {
    try {
      await this.modificarFoto(cliente);
      await this.modificarDoc(cliente);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }

  private async eliminarFoto(cliente: Cliente) {
    const nombreArchivo = cliente.id.toString();
    await this.cloudStorageService.borrarArchivo(this.carpeta, nombreArchivo);
  }

  private async eliminarDoc(cliente: Cliente) {
    const doc = Cliente.toDoc(cliente);
    await this.firestoreService.eliminar(this.col, doc.id);
  }

  private eliminarAuth() {
    return this.authService.eliminar();
  }

  public async baja(cliente: Cliente) {
    try {
      await this.eliminarAuth();
      await this.eliminarFoto(cliente);
      await this.eliminarDoc(cliente);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }

  public async bajaLogica(cliente: Cliente) {
    try {
      cliente.habilitado = false;
      await this.modificarDoc(cliente);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }

  public traerTodosObservable() {
    return this.firestoreService
      .traerTodos(this.col)
      .pipe(map((listaDocs) => listaDocs.map((e) => Cliente.parseDoc(e))));
  }

  public traerPorIdObservable(cliente: Cliente) {
    const doc = Cliente.toDoc(cliente);
    return this.firestoreService
      .traerPorId(doc.id, this.col)
      .pipe(map((doc) => Cliente.parseDoc(doc)));
  }
}