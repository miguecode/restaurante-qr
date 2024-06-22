import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { CloudStorageService } from './firebase/cloud-storage.service';
import { Supervisor } from '../classes/supervisor';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  private col = 'supervisores';
  private carpeta = 'supervisores';
  private supervisores: Supervisor[] = [];
  private flagObservable: boolean = false;

  constructor(
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
    const nombreArchivo = supervisor.id.toString();

    if (supervisor.file !== undefined) {
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
  }
  private async eliminarFoto(supervisor: Supervisor) {
    const nombreArchivo = supervisor.id.toString();
    await this.cloudStorageService.borrarArchivo(this.carpeta, nombreArchivo);
  }
  private async insertarDoc(supervisor: Supervisor) {
    const doc = Supervisor.toDoc(supervisor);
    return this.firestoreService.insertarConId(this.col, doc.id, doc);
  }
  public async modificarDoc(supervisor: Supervisor) {
    const doc = Supervisor.toDoc(supervisor);
    await this.firestoreService.modificar(this.col, doc.id, doc);
  }
  public async eliminarDoc(supervisor: Supervisor) {
    const doc = Supervisor.toDoc(supervisor);
    await this.firestoreService.eliminar(this.col, doc.id);
  }

  public async alta(supervisor: Supervisor) {
    await this.setId(supervisor);
    await this.insertarFoto(supervisor); // !OJO! el file que se le asigna a la entidad debe ser [Uri]
    await this.insertarDoc(supervisor);
    return supervisor; // Esta linea se puede borrar, solo la use para debugear
  }
  public async baja(supervisor: Supervisor) {
    await this.eliminarFoto(supervisor);
    await this.eliminarDoc(supervisor);
  }
  public async modificar(supervisor: Supervisor) {
    await this.modificarFoto(supervisor);
    await this.modificarDoc(supervisor);
  }

  public traerTodosObservable() {
    return this.firestoreService
      .traerTodos(this.col)
      .pipe(map((listaDocs) => listaDocs.map((m) => Supervisor.parseDoc(m))));
  }
  public traerPorIdObservable(supervisor: Supervisor) {
    const doc = Supervisor.toDoc(supervisor);
    return this.firestoreService
      .traerPorId(doc.id, this.col)
      .pipe(map((doc) => Supervisor.parseDoc(doc)));
  }
}
