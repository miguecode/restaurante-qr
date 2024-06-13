import { Injectable } from '@angular/core';
import {
  Storage,
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
  private traerTodas(carpeta: string) {
    const imagesRef = ref(this.storage, carpeta);
    return listAll(imagesRef);
  }
  private static obtenerNombreSinExtension(nombreArchivo: string): string {
    const lastIndex = nombreArchivo.lastIndexOf('.');

    if (lastIndex !== -1) {
      return nombreArchivo.substring(0, lastIndex);
    }

    return nombreArchivo;
  }

  public subirArchivoBase64(
    carpeta: string,
    nombreArchivo: string,
    archivoBase64: any
  ) {
    const storageRef = ref(this.storage, `${carpeta}/${nombreArchivo}.jpg`);
    const blob = CloudStorageService.convertirBase64ABlob(archivoBase64);
    return uploadBytes(storageRef, blob);
  }
  public async traerUrlPorNombre(nombre: string, carpeta: string) {
    const carpetaStorage = await this.traerTodas(carpeta);

    for (let item of carpetaStorage.items) {
      const nombreArchivo = CloudStorageService.obtenerNombreSinExtension(
        item.name
      );
      if (nombreArchivo === nombre) {
        return getDownloadURL(item);
      }
    }

    return undefined;
  }
}
