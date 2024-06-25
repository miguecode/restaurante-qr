import { CanActivateFn } from '@angular/router';

export const clienteMaitreGuard: CanActivateFn = (route, state) => {
  return true;
};
