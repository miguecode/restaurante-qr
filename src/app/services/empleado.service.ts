import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { Empleado } from '../classes/empleado';
import { AuthService } from './firebase/auth.service';
import { CloudStorageService } from './firebase/cloud-storage.service';
import { firstValueFrom, isObservable, map } from 'rxjs';
import { sendEmailVerification } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private col = 'empleados';
  private carpeta = 'empleados';
  private empleados: Empleado[] = [];
  private flagObservable: boolean = false;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private cloudStorageService: CloudStorageService
  ) {
    this.traerTodosObservable().subscribe((l) => {
      this.empleados = l;
      this.flagObservable = true;
    });
  }

  private traerTodos() {
    return new Promise<Empleado[]>((resolver) => {
      if (this.flagObservable === true) {
        resolver(this.empleados);
      }

      setTimeout(() => {
        resolver(this.empleados);
      }, 5000); // Este valor se puede bajar, pero no mucho
    });
  }
  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }
  private async registrarAuth(empleado: Empleado) {
    try {
      const userCred = await this.authService.registrar(
        empleado.correo,
        empleado.clave
      );
      //await sendEmailVerification(userCred.user);
    } catch (e) {
      throw new Error('Ya existe un usuario con ese correo');
    }
  }
  private cerrarSesionAuth() {
    return this.authService.cerrarSesion();
  }
  private async setId(empleado: Empleado) {
    const id = await this.traerProximoId();
    if (id === undefined) {
      throw new Error('Hubo un problema al calcular el ID');
    }
    empleado.id = id;
  }
  private async insertarFoto(empleado: Empleado) {
    const nombreArchivo = empleado.id.toString();

    await this.cloudStorageService.subirArchivoUri(
      this.carpeta,
      nombreArchivo,
      empleado.file
    );

    const fotoUrl = await this.cloudStorageService.traerUrlPorNombre(
      this.carpeta,
      nombreArchivo
    );
    if (fotoUrl === undefined) {
      throw new Error('Hubo un problema al recuperar la URL de la foto');
    }
    empleado.foto = fotoUrl;
  }
  private async modificarFoto(empleado: Empleado) {
    if (empleado.file !== undefined && empleado.file !== null) {
      await this.insertarFoto(empleado);
    }
  }
  private async eliminarFoto(empleado: Empleado) {
    const nombreArchivo = empleado.id.toString();
    await this.cloudStorageService.borrarArchivo(this.carpeta, nombreArchivo);
  }
  private async insertarDoc(empleado: Empleado) {
    const doc = Empleado.toDoc(empleado);
    console.log(doc);
    return this.firestoreService.insertarConId(this.col, doc.id, doc);
  }
  private async modificarDoc(empleado: Empleado) {
    const doc = Empleado.toDoc(empleado);
    await this.firestoreService.modificar(this.col, doc.id, doc);
  }
  private async eliminarDoc(empleado: Empleado) {
    const doc = Empleado.toDoc(empleado);
    await this.firestoreService.eliminar(this.col, doc.id);
  }
  private eliminarAuth() {
    return this.authService.eliminar();
  }

  public async alta(empleado: Empleado) {
    try {
      await this.registrarAuth(empleado);
      await this.cerrarSesionAuth();
      await this.setId(empleado);
      await this.insertarFoto(empleado); // !OJO! el file que se le asigna a la entidad debe ser [Uri]
      await this.insertarDoc(empleado);
      return empleado; // Esta linea se puede borrar, solo la use para debugear
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }
  public async baja(empleado: Empleado) {
    try {
      await this.eliminarAuth();
      await this.eliminarFoto(empleado);
      await this.eliminarDoc(empleado);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }
  public async bajaLogica(empleado: Empleado) {
    try {
      empleado.habilitado = false;
      await this.modificarDoc(empleado);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }
  public async modificar(empleado: Empleado) {
    try {
      await this.modificarFoto(empleado);
      await this.modificarDoc(empleado);
    } catch (e: any) {
      await this.cerrarSesionAuth();
      throw new Error(e.message);
    }
  }

  public traerTodosObservable() {
    return this.firestoreService
      .traerTodos(this.col)
      .pipe(map((listaDocs) => listaDocs.map((e) => Empleado.parseDoc(e))));
  }
  public traerPorIdObservable(empleado: Empleado) {
    const doc = Empleado.toDoc(empleado);
    return this.firestoreService
      .traerPorId(doc.id, this.col)
      .pipe(map((doc) => Empleado.parseDoc(doc)));
  }
}
