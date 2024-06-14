import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { Empleado } from '../classes/empleado';
import { AuthService } from './firebase/auth.service';
import { CloudStorageService } from './firebase/cloud-storage.service';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private col = 'empleados';
  private carpeta = 'empleados';

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private cloudStorageService: CloudStorageService
  ) {}

  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }
  private registrarAuth(empleado: Empleado) {
    return this.authService.registrar(empleado.correo, empleado.clave);
  }
  private cerrarSesionAuth() {
    return this.authService.cerrarSesion();
  }
  private async setId(empleado: Empleado) {
    const id = await this.traerProximoId();
    if (id === undefined) {
      throw new Error('El ID fue null');
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
      nombreArchivo,
      this.carpeta
    );
    if (fotoUrl === undefined) {
      throw new Error('Hubo un problema al recuperar la URL de la foto');
    }
    empleado.foto = fotoUrl;
  }
  private async insertarDoc(empleado: Empleado) {
    const doc = Empleado.toDoc(empleado);
    return this.firestoreService.insertarConId(doc.id, doc, this.col);
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
}
