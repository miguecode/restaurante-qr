import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { Supervisor } from '../classes/supervisor';
import { AuthService } from './firebase/auth.service';
import { CloudStorageService } from './firebase/cloud-storage.service';
import { firstValueFrom, isObservable, map } from 'rxjs';
import { sendEmailVerification } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  private col = 'supervisores';
  private carpeta = 'supervisores';
  private supervisores: Supervisor[] = [];
  private flagObservable: boolean = false;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private cloudStorageService: CloudStorageService
  ) {
    this.traerTodosObservable().subscribe((l) => {
      this.supervisores = l;
      this.flagObservable = true;
    });
  }

  private traerTodos() {
    return new Promise<Supervisor[]>((resolver) => {
      if (this.flagObservable === true) {
        resolver(this.supervisores);
      }

      setTimeout(() => {
        resolver(this.supervisores);
      }, 5000); // Este valor se puede bajar, pero no mucho
    });
  }
  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }
  private async registrarAuth(supervisor: Supervisor) {
    try {
      const userCred = await this.authService.registrar(
        supervisor.correo,
        supervisor.clave
      );
      //await sendEmailVerification(userCred.user);
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
      throw new Error('Hubo un problema al calcular el ID');
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
      this.carpeta,
      nombreArchivo
    );
    if (fotoUrl === undefined) {
      throw new Error('Hubo un problema al recuperar la URL de la foto');
    }
    supervisor.foto = fotoUrl;
  }
  private async modificarFoto(supervisor: Supervisor) {
    if (supervisor.file !== undefined && supervisor.file !== null) {
      await this.insertarFoto(supervisor);
    }
  }
  private async eliminarFoto(supervisor: Supervisor) {
    const nombreArchivo = supervisor.id.toString();
    await this.cloudStorageService.borrarArchivo(this.carpeta, nombreArchivo);
  }
  private async insertarDoc(supervisor: Supervisor) {
    const doc = Supervisor.toDoc(supervisor);
    console.log(doc);
    return this.firestoreService.insertarConId(this.col, doc.id, doc);
  }
  private async modificarDoc(supervisor: Supervisor) {
    const doc = Supervisor.toDoc(supervisor);
    await this.firestoreService.modificar(this.col, doc.id, doc);
  }
  private async eliminarDoc(supervisor: Supervisor) {
    const doc = Supervisor.toDoc(supervisor);
    await this.firestoreService.eliminar(this.col, doc.id);
  }
  private eliminarAuth() {
    return this.authService.eliminar();
  }

  public async alta(supervisor: Supervisor) {
    try {
      await this.registrarAuth(supervisor);
      await this.cerrarSesionAuth();
      await this.setId(supervisor);
      supervisor.habilitado = true;
      await this.insertarFoto(supervisor); // !OJO! el file que se le asigna a la entidad debe ser [Uri]
      await this.insertarDoc(supervisor);
      return supervisor; // Esta linea se puede borrar, solo la use para debugear
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }
  public async baja(supervisor: Supervisor) {
    try {
      await this.eliminarAuth();
      await this.eliminarFoto(supervisor);
      await this.eliminarDoc(supervisor);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }
  public async bajaLogica(supervisor: Supervisor) {
    try {
      supervisor.habilitado = false;
      await this.modificarDoc(supervisor);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }
  public async modificar(supervisor: Supervisor) {
    try {
      await this.modificarFoto(supervisor);
      await this.modificarDoc(supervisor);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }

  public traerTodosObservable() {
    return this.firestoreService
      .traerTodos(this.col)
      .pipe(map((listaDocs) => listaDocs.map((e) => Supervisor.parseDoc(e))));
  }
  public traerPorIdObservable(supervisor: Supervisor) {
    const doc = Supervisor.toDoc(supervisor);
    return this.firestoreService
      .traerPorId(doc.id, this.col)
      .pipe(map((doc) => Supervisor.parseDoc(doc)));
  }
}
