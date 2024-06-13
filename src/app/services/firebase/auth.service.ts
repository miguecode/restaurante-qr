import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private credenciales: any = undefined;

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
    return new Promise<string | undefined>((ok) => {
      if (this.credenciales) {
        ok(this.credenciales.email);
      } else {
        setTimeout(() => {
          if (!this.credenciales) {
            ok(undefined);
          }
          ok(this.credenciales.email);
        }, 500);
      }
    });
  }

  public getVerificoCorreo() {
    return new Promise<boolean | undefined>((ok) => {
      if (this.credenciales) {
        ok(this.credenciales.emailVerified);
      } else {
        setTimeout(() => {
          if (!this.credenciales) {
            ok(undefined);
          }
          ok(this.credenciales.emailVerified);
        }, 500);
      }
    });
  }

  public cerrarSesion() {
    return signOut(this.auth);
  }
}
