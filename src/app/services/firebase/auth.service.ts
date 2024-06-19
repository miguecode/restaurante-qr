import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private credenciales: any = null;

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (userCred) => {
      if (userCred) {
        this.credenciales = userCred;
      }
    });
  }

  public iniciarSesion(correo: string, clave: string) {
    return signInWithEmailAndPassword(this.auth, correo, clave);
  }

  public registrar(correo: string, clave: string) {
    return createUserWithEmailAndPassword(this.auth, correo, clave);
  }

  public getCorreo() {
    return new Promise<string | undefined>((resolver) => {
      if (this.credenciales !== null) {
        resolver(this.credenciales.email);
      }

      setTimeout(() => {
        if (this.credenciales === null) {
          resolver(undefined);
        }

        resolver(this.credenciales.email);
      }, 500);
    });
  }

  public getVerificoCorreo() {
    return new Promise<boolean | undefined>((resolver) => {
      if (this.credenciales !== null) {
        resolver(this.credenciales.emailVerified);
      }

      setTimeout(() => {
        if (this.credenciales === null) {
          resolver(undefined);
        }

        resolver(this.credenciales.emailVerified);
      }, 500);
    });
  }

  public cerrarSesion() {
    return signOut(this.auth);
  }

  public async eliminar() {
    return deleteUser(this.credenciales);
  }
}
