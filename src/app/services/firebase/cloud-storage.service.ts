import { Injectable } from '@angular/core';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class CloudStorageService {
  constructor(private storage: Storage) {}

  private static convertirBase64ABlob(archivoBase64: any) {
    const byteCharacters = atob(archivoBase64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    return blob;
  }
  private static async convertirUriABlob(archivoUri: any) {
    const imagen = await fetch(archivoUri);
    const blob = await imagen.blob();
    return blob;
  }
  private traerCarpeta(carpeta: string) {
    const storageRef = ref(this.storage, carpeta);
    return listAll(storageRef);
  }
  private static getNombreSinExtension(nombreArchivo: string): string {
    const lastIndex = nombreArchivo.lastIndexOf('.');

    if (lastIndex !== -1) {
      return nombreArchivo.substring(0, lastIndex);
    }

    return nombreArchivo;
  }

  public async subirArchivoUri(
    carpeta: string,
    nombreArchivo: string,
    archivoUri: any
  ) {
    const storageRef = ref(this.storage, `${carpeta}/${nombreArchivo}`);
    const blob = await CloudStorageService.convertirUriABlob(archivoUri);
    return uploadBytes(storageRef, blob);
  }
  public async traerUrlPorNombre(carpeta: string, nombre: string) {
    const carpetaStorage = await this.traerCarpeta(carpeta);

    for (let item of carpetaStorage.items) {
      const nombreArchivo = CloudStorageService.getNombreSinExtension(
        item.name
      );
      if (nombreArchivo === nombre) {
        return getDownloadURL(item);
      }
    }

    return undefined;
  }
  public async borrarArchivo(carpeta: string, nombreArchivo: string) {
    const storageRef = ref(this.storage, `${carpeta}/${nombreArchivo}`);
    return deleteObject(storageRef);
  }
}
