import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SplashService {
  estadoMostrado: boolean = false;

  constructor() {}

  seMostro() {
    return this.estadoMostrado;
  }
}
