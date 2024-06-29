import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SplashService } from '../services/utils/splash.service';

export const splashGuard: CanActivateFn = (route, state) => {
  const splashService = inject(SplashService);
  const router = inject(Router);

  if (!splashService.seMostro()) {
    return true;
  }

  router.navigateByUrl('login');
  return false;
};
