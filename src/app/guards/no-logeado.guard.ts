import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/firebase/auth.service';

export const noLogeadoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return new Observable<boolean>((observer) => {
    authService.getCorreo().then((email) => {
      if (email) {
        observer.next(false);
      } else {
        observer.next(true);
      }
      observer.complete();
    });
  });
};
