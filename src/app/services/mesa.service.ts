import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { CloudStorageService } from './firebase/cloud-storage.service';
import { Mesa } from '../classes/mesa';
import { map } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private col = 'mesas';
  private carpeta = 'mesas';
  private mesas: Mesa[] = [];
  private flagObservable: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private cloudStorageService: CloudStorageService,
    private apiService: ApiService
  ) {
    this.traerTodosObservable().subscribe((l) => {
      this.mesas = l;
      this.flagObservable = true;
    });
  }

  private traerTodos() {
    return new Promise<Mesa[]>((resolver) => {
      if (this.flagObservable === true) {
        resolver(this.mesas);
      }

      setTimeout(() => {
        resolver(this.mesas);
      }, 5000); // Este valor se puede bajar, pero no mucho
    });
  }
  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }
  private async setId(mesa: Mesa) {
    const id = await this.traerProximoId();
    if (id === undefined) {
      throw new Error('Hubo un problema al calcular el ID');
    }
    mesa.id = id;
  }
  private async insertarFoto(mesa: Mesa) {
    const nombreArchivo = mesa.id.toString();

    await this.cloudStorageService.subirArchivoUri(
      this.carpeta,
      nombreArchivo,
      mesa.file
    );

    const fotoUrl = await this.cloudStorageService.traerUrlPorNombre(
      this.carpeta,
      nombreArchivo
    );
    if (fotoUrl === undefined) {
      throw new Error('Hubo un problema al recuperar la URL de la foto');
    }
    mesa.foto = fotoUrl;
  }
  private async modificarFoto(mesa: Mesa) {
    if (mesa.file !== undefined && mesa.file !== null) {
      await this.insertarFoto(mesa);
    }
  }
  private async eliminarFoto(mesa: Mesa) {
    const nombreArchivo = mesa.id.toString();
    await this.cloudStorageService.borrarArchivo(this.carpeta, nombreArchivo);
  }
  private async insertarQr(mesa: Mesa) {
    const nombreArchivo = mesa.id.toString() + '-' + 'qr';
    const qrApi = await this.apiService.generarQrMesa(mesa);

    await this.cloudStorageService.subirArchivoBase64(
      this.carpeta,
      nombreArchivo,
      qrApi.base64
    );

    const qrUrl = await this.cloudStorageService.traerUrlPorNombre(
      this.carpeta,
      nombreArchivo
    );
    if (qrUrl === undefined) {
      throw new Error('Hubo un problema al recuperar la URL del QR');
    }
    mesa.qr = qrUrl;
  }
  private async eliminarQr(mesa: Mesa) {
    const nombreArchivo = mesa.id.toString() + '-' + 'qr';
    await this.cloudStorageService.borrarArchivo(this.carpeta, nombreArchivo);
  }
  private async insertarDoc(mesa: Mesa) {
    const doc = Mesa.toDoc(mesa);
    return this.firestoreService.insertarConId(this.col, doc.id, doc);
  }
  private async modificarDoc(mesa: Mesa) {
    const doc = Mesa.toDoc(mesa);
    await this.firestoreService.modificar(this.col, doc.id, doc);
  }
  private async eliminarDoc(mesa: Mesa) {
    const doc = Mesa.toDoc(mesa);
    await this.firestoreService.eliminar(this.col, doc.id);
  }

  public async alta(mesa: Mesa) {
    await this.setId(mesa);
    await this.insertarFoto(mesa); // !OJO! el file que se le asigna a la entidad debe ser [Uri]
    await this.insertarQr(mesa);
    await this.insertarDoc(mesa);
    return mesa; // Esta linea se puede borrar, solo la use para debugear
  }
  public async baja(mesa: Mesa) {
    await this.eliminarFoto(mesa);
    await this.eliminarQr(mesa);
    await this.eliminarDoc(mesa);
  }
  public async modificar(mesa: Mesa) {
    await this.modificarFoto(mesa);
    await this.modificarDoc(mesa);
  }

  public traerTodosObservable() {
    return this.firestoreService
      .traerTodos(this.col)
      .pipe(map((listaDocs) => listaDocs.map((m) => Mesa.parseDoc(m))));
  }
  public traerPorIdObservable(mesa: Mesa) {
    const doc = Mesa.toDoc(mesa);
    return this.firestoreService
      .traerPorId(doc.id, this.col)
      .pipe(map((doc) => Mesa.parseDoc(doc)));
  }
}
