import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { Usuario } from '../classes/padres/usuario';
import { AuthService } from './firebase/auth.service';
import { CloudStorageService } from './firebase/cloud-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private carpeta = 'usuarios';
  private col = 'usuarios';

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private cloudStorageService: CloudStorageService
  ) {}

  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }
  private registrar(usuario: Usuario) {
    return this.authService.registrar(usuario.correo, usuario.clave);
  }
  private cerrarSesion() {
    return this.authService.cerrarSesion();
  }
  private async insertarFoto(usuario: Usuario) {
    const nombreArchivo = usuario.id.toString();

    await this.cloudStorageService.subirArchivoBase64(
      this.carpeta,
      nombreArchivo,
      usuario.file
    );

    const fotoUrl = await this.cloudStorageService.traerUrlPorNombre(
      nombreArchivo,
      this.carpeta
    );

    return fotoUrl;
  }
  /*private insertarDoc(usuario: Usuario) {
    const doc = Usuario.toDoc(usuario);
    return this.firestoreService.insertarConId(doc.id, doc, this.col);
  }

  public async alta(usuario: Usuario) {
    let flag: boolean = false;

    try {
      await this.registrar(usuario);
      await this.cerrarSesion();

      // !OJO! el file que se le asigna a la entidad debe ser [base64]
      const fotoUrl = await this.insertarFoto(usuario);
      if (fotoUrl === undefined) {
        flag = true;
        throw new Error('Hubo un problema al recuperar la URL de la foto');
      }
      usuario.foto = fotoUrl;

      const id = await this.traerProximoId();
      if (id === undefined) {
        flag = true;
        throw new Error('El ID fue null');
      }
      usuario.id = id;

      await this.insertarDoc(usuario);

      return usuario; // Esta linea se puede borrar, solo la use para debugear
    } catch (e: any) {
      if (!flag) {
        throw new Error(e.message);
      }

      throw new Error(e.message);
    }
  }*/
}
