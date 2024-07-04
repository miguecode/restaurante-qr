import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { CloudStorageService } from './firebase/cloud-storage.service';
import { Producto } from '../classes/producto';
import { map } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private col = 'productos';
  private carpeta = 'productos';
  private productos: Producto[] = [];
  private flagObservable: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private cloudStorageService: CloudStorageService,
    private apiService: ApiService
  ) {
    this.traerTodosObservable().subscribe((l) => {
      this.productos = l;
      this.flagObservable = true;
    });
  }

  private traerTodos() {
    return new Promise<Producto[]>((resolver) => {
      if (this.flagObservable === true) {
        resolver(this.productos);
      }

      setTimeout(() => {
        resolver(this.productos);
      }, 5000); // Este valor se puede bajar, pero no mucho
    });
  }

  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }

  private async setId(producto: Producto) {
    const id = await this.traerProximoId();
    if (id === undefined) {
      throw new Error('Hubo un problema al calcular el ID');
    }
    producto.id = id;
  }

  private async insertarFotos(producto: Producto) {
    const nombreArchivoUno = producto.id.toString() + '-1';
    const nombreArchivoDos = producto.id.toString() + '-2';
    const nombreArchivoTres = producto.id.toString() + '-3';

    await this.cloudStorageService.subirArchivoUri(
      this.carpeta,
      nombreArchivoUno,
      producto.fileUno
    );
    await this.cloudStorageService.subirArchivoUri(
      this.carpeta,
      nombreArchivoDos,
      producto.fileDos
    );
    await this.cloudStorageService.subirArchivoUri(
      this.carpeta,
      nombreArchivoTres,
      producto.fileTres
    );

    const fotoUrlUno = await this.cloudStorageService.traerUrlPorNombre(
      this.carpeta,
      nombreArchivoUno
    );
    const fotoUrlDos = await this.cloudStorageService.traerUrlPorNombre(
      this.carpeta,
      nombreArchivoDos
    );
    const fotoUrlTres = await this.cloudStorageService.traerUrlPorNombre(
      this.carpeta,
      nombreArchivoTres
    );

    if (!fotoUrlUno || !fotoUrlDos || !fotoUrlTres) {
      throw new Error('Hubo un problema al recuperar la URL de las fotos');
    }

    producto.fotoUno = fotoUrlUno;
    producto.fotoDos = fotoUrlDos;
    producto.fotoTres = fotoUrlTres;
  }

  private async modificarFotos(producto: Producto) {
    if (producto.fileUno !== undefined && producto.fileUno !== null) {
      await this.insertarFotos(producto);
    }
  }

  private async eliminarFotos(producto: Producto) {
    const nombreArchivoUno = producto.id.toString() + '-1';
    const nombreArchivoDos = producto.id.toString() + '-2';
    const nombreArchivoTres = producto.id.toString() + '-3';

    await this.cloudStorageService.borrarArchivo(
      this.carpeta,
      nombreArchivoUno
    );
    await this.cloudStorageService.borrarArchivo(
      this.carpeta,
      nombreArchivoDos
    );
    await this.cloudStorageService.borrarArchivo(
      this.carpeta,
      nombreArchivoTres
    );
  }

  private async insertarQr(producto: Producto) {
    const nombreArchivo = producto.id.toString() + '-' + 'qr';
    const qrApi = await this.apiService.generarQrProducto(producto);

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
    producto.qr = qrUrl;
  }

  private async eliminarQr(producto: Producto) {
    const nombreArchivo = producto.id.toString() + '-' + 'qr';
    await this.cloudStorageService.borrarArchivo(this.carpeta, nombreArchivo);
  }

  private async insertarDoc(producto: Producto) {
    const doc = Producto.toDoc(producto);
    return this.firestoreService.insertarConId(this.col, doc.id, doc);
  }

  private async modificarDoc(producto: Producto) {
    const doc = Producto.toDoc(producto);
    await this.firestoreService.modificar(this.col, doc.id, doc);
  }

  private async eliminarDoc(producto: Producto) {
    const doc = Producto.toDoc(producto);
    await this.firestoreService.eliminar(this.col, doc.id);
  }

  public async alta(producto: Producto) {
    await this.setId(producto);
    await this.insertarFotos(producto);
    await this.insertarQr(producto);
    await this.insertarDoc(producto);
  }

  public async baja(producto: Producto) {
    await this.eliminarFotos(producto);
    await this.eliminarQr(producto);
    await this.eliminarDoc(producto);
  }

  public async modificar(producto: Producto) {
    await this.modificarFotos(producto);
    await this.modificarDoc(producto);
  }

  public traerTodosObservable() {
    return this.firestoreService
      .traerTodos(this.col)
      .pipe(map((listaDocs) => listaDocs.map((m) => Producto.parseDoc(m))));
  }

  public traerPorIdObservable(producto: Producto) {
    const doc = Producto.toDoc(producto);
    return this.firestoreService
      .traerPorId(this.col, doc.id)
      .pipe(map((doc) => Producto.parseDoc(doc)));
  }
}
