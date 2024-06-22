import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { Duenio } from '../classes/duenio';
import { AuthService } from './firebase/auth.service';
import { CloudStorageService } from './firebase/cloud-storage.service';
import { firstValueFrom, isObservable, map } from 'rxjs';
import { sendEmailVerification } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class DuenioService {
  private col = 'duenios';
  private carpeta = 'duenios';
  private duenios: Duenio[] = [];
  private flagObservable: boolean = false;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private cloudStorageService: CloudStorageService
  ) {
    this.traerTodosObservable().subscribe((l) => {
      this.duenios = l;
      this.flagObservable = true;
    });
  }

  private traerTodos() {
    return new Promise<Duenio[]>((resolver) => {
      if (this.flagObservable === true) {
        resolver(this.duenios);
      }

      setTimeout(() => {
        resolver(this.duenios);
      }, 5000); // Este valor se puede bajar, pero no mucho
    });
  }
  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }
  private async registrarAuth(duenio: Duenio) {
    try {
      const userCred = await this.authService.registrar(
        duenio.correo,
        duenio.clave
      );
      //await sendEmailVerification(userCred.user);
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
      throw new Error('Hubo un problema al calcular el ID');
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
      this.carpeta,
      nombreArchivo
    );
    if (fotoUrl === undefined) {
      throw new Error('Hubo un problema al recuperar la URL de la foto');
    }
    duenio.foto = fotoUrl;
  }
  private async modificarFoto(duenio: Duenio) {
    if (duenio.file !== undefined && duenio.file !== null) {
      await this.insertarFoto(duenio);
    }
  }
  private async eliminarFoto(duenio: Duenio) {
    const nombreArchivo = duenio.id.toString();
    await this.cloudStorageService.borrarArchivo(this.carpeta, nombreArchivo);
  }
  private async insertarDoc(duenio: Duenio) {
    const doc = Duenio.toDoc(duenio);
    console.log(doc);
    return this.firestoreService.insertarConId(this.col, doc.id, doc);
  }
  private async modificarDoc(duenio: Duenio) {
    const doc = Duenio.toDoc(duenio);
    await this.firestoreService.modificar(this.col, doc.id, doc);
  }
  private async eliminarDoc(duenio: Duenio) {
    const doc = Duenio.toDoc(duenio);
    await this.firestoreService.eliminar(this.col, doc.id);
  }
  private eliminarAuth() {
    return this.authService.eliminar();
  }

  public async alta(duenio: Duenio) {
    try {
      await this.registrarAuth(duenio);
      await this.cerrarSesionAuth();
      await this.setId(duenio);
      await this.insertarFoto(duenio); // !OJO! el file que se le asigna a la entidad debe ser [Uri]
      await this.insertarDoc(duenio);
      return duenio; // Esta linea se puede borrar, solo la use para debugear
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }
  public async baja(duenio: Duenio) {
    try {
      await this.eliminarAuth();
      await this.eliminarFoto(duenio);
      await this.eliminarDoc(duenio);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }
  public async bajaLogica(duenio: Duenio) {
    try {
      duenio.habilitado = false;
      await this.modificarDoc(duenio);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }
  public async modificar(duenio: Duenio) {
    try {
      await this.modificarFoto(duenio);
      await this.modificarDoc(duenio);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }

  public traerTodosObservable() {
    return this.firestoreService
      .traerTodos(this.col)
      .pipe(map((listaDocs) => listaDocs.map((e) => Duenio.parseDoc(e))));
  }
  public traerPorIdObservable(duenio: Duenio) {
    const doc = Duenio.toDoc(duenio);
    return this.firestoreService
      .traerPorId(doc.id, this.col)
      .pipe(map((doc) => Duenio.parseDoc(doc)));
  }
}
