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

  private static convertirBase64ABlob(archivoBase64: any, mimeType: string) {
    // Valido y limpio la cadena base64
    if (!CloudStorageService.validarBase64(archivoBase64)) {
      throw new Error('La cadena base64 no es válida');
    }

    archivoBase64 = CloudStorageService.limpiarBase64(archivoBase64);

    const byteCharacters = atob(archivoBase64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    return blob;
  }
  private static limpiarBase64(cadena: string): string {
    // Elimino cualquier carácter no válido
    cadena = cadena.replace(/[^A-Za-z0-9+/=]/g, '');

    while (cadena.length % 4 !== 0) {
      cadena += '=';
    }

    return cadena;
  }
  private static validarBase64(cadena: string): boolean {
    const base64Regex =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Regex.test(cadena);
  }

  // Ya no la usamos
  /*private static async convertirUriABlob(archivoUri: any, mimeType: string) {
    const response = await fetch(archivoUri);
    const blob = await response.blob();
    return new Blob([blob], { type: mimeType });
  }*/
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

  public async subirArchivoUri(
    carpeta: string,
    nombreArchivo: string,
    archivo: { base64String: string; mimeType: string }
  ) {
    const storageRef = ref(this.storage, `${carpeta}/${nombreArchivo}`);
    const blob = CloudStorageService.convertirBase64ABlob(
      archivo.base64String,
      archivo.mimeType
    );
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
