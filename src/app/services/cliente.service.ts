import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { CloudStorageService } from './firebase/cloud-storage.service';
import { Cliente } from '../classes/cliente';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private col = 'clientes';
  private carpeta = 'clientes';
  private clientes: Cliente[] = [];
  private flagObservable: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private cloudStorageService: CloudStorageService
  ) {
    this.traerTodosObservable().subscribe((l) => {
      this.clientes = l;
      this.flagObservable = true;
    });
  }

  private traerTodos() {
    return new Promise<Cliente[]>((resolver) => {
      if (this.flagObservable === true) {
        resolver(this.clientes);
      }

      setTimeout(() => {
        resolver(this.clientes);
      }, 5000); // Este valor se puede bajar, pero no mucho
    });
  }
  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }
  private async setId(cliente: Cliente) {
    const id = await this.traerProximoId();
    if (id === undefined) {
      throw new Error('Hubo un problema al calcular el ID');
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
      this.carpeta,
      nombreArchivo
    );
    if (fotoUrl === undefined) {
      throw new Error('Hubo un problema al recuperar la URL de la foto');
    }
    cliente.foto = fotoUrl;
  }
  private async modificarFoto(cliente: Cliente) {
    const nombreArchivo = cliente.id.toString();

    if (cliente.file !== undefined) {
      await this.cloudStorageService.subirArchivoUri(
        nombreArchivo,
        this.carpeta,
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
  }
  private async eliminarFoto(cliente: Cliente) {
    const nombreArchivo = cliente.id.toString();
    await this.cloudStorageService.borrarArchivo(this.carpeta, nombreArchivo);
  }
  private async insertarDoc(cliente: Cliente) {
    const doc = Cliente.toDoc(cliente);
    return this.firestoreService.insertarConId(this.col, doc.id, doc);
  }
  public async modificarDoc(cliente: Cliente) {
    const doc = Cliente.toDoc(cliente);
    await this.firestoreService.modificar(this.col, doc.id, doc);
  }
  public async eliminarDoc(cliente: Cliente) {
    const doc = Cliente.toDoc(cliente);
    await this.firestoreService.eliminar(this.col, doc.id);
  }

  public async alta(cliente: Cliente) {
    await this.setId(cliente);
    await this.insertarFoto(cliente); // !OJO! el file que se le asigna a la entidad debe ser [Uri]
    await this.insertarDoc(cliente);
    return cliente; // Esta linea se puede borrar, solo la use para debugear
  }
  public async baja(cliente: Cliente) {
    await this.eliminarFoto(cliente);
    await this.eliminarDoc(cliente);
  }
  public async modificar(cliente: Cliente) {
    await this.modificarFoto(cliente);
    await this.modificarDoc(cliente);
  }

  public traerTodosObservable() {
    return this.firestoreService
      .traerTodos(this.col)
      .pipe(map((listaDocs) => listaDocs.map((m) => Cliente.parseDoc(m))));
  }
  public traerPorIdObservable(cliente: Cliente) {
    const doc = Cliente.toDoc(cliente);
    return this.firestoreService
      .traerPorId(doc.id, this.col)
      .pipe(map((doc) => Cliente.parseDoc(doc)));
  }
}
