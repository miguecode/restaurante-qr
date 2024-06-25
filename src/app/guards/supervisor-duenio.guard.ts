import { CanActivateFn } from '@angular/router';

export const supervisorDuenioGuard: CanActivateFn = (route, state) => {
  return true;
};
