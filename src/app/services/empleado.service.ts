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
  private registrar(empleado: Empleado) {
    return this.authService.registrar(empleado.correo, empleado.clave);
  }
  private cerrarSesion() {
    return this.authService.cerrarSesion();
  }
  private async insertarFoto(empleado: Empleado) {
    const nombreArchivo = empleado.id.toString();

    await this.cloudStorageService.subirArchivoBase64(
      this.carpeta,
      nombreArchivo,
      empleado.file
    );

    const fotoUrl = await this.cloudStorageService.traerUrlPorNombre(
      nombreArchivo,
      this.carpeta
    );

    return fotoUrl;
  }
  private insertarDoc(empleado: Empleado) {
    const doc = Empleado.toDoc(empleado);
    return this.firestoreService.insertarConId(doc.id, doc, this.col);
  }

  public async alta(empleado: Empleado) {
    let flag: boolean = false;

    try {
      await this.registrar(empleado);
      await this.cerrarSesion();

      // !OJO! el file que se le asigna a la entidad debe ser [base64]
      const fotoUrl = await this.insertarFoto(empleado);
      if (fotoUrl === undefined) {
        flag = true;
        throw new Error('Hubo un problema al recuperar la URL de la foto');
      }
      empleado.foto = fotoUrl;

      const id = await this.traerProximoId();
      if (id === undefined) {
        flag = true;
        throw new Error('El ID fue null');
      }
      empleado.id = id;

      await this.insertarDoc(empleado);

      return empleado; // Esta linea se puede borrar, solo la use para debugear
    } catch (e: any) {
      if (!flag) {
        throw new Error(e.message);
      }

      throw new Error(e.message);
    }
  }
}
