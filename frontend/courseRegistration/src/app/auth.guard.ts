import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter, map, switchMap, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isInitialized$.pipe(
    filter(initialized => initialized), // Wait for auth initialization
    take(1),
    switchMap(() => authService.currentUser$.pipe(
      take(1),
      map((user) => {
        const expectedRole = route.firstChild?.data?.['role'];   // check in the childroute data
        
        // If no user, redirect to login
        if (!user) {
          return router.createUrlTree(['/auth-login']);
        }

        // If role doesnot match, redirect to role's default
        if (expectedRole && user.role !== expectedRole) {
          const defaultRoute = authService.getDefaultRoute(user.role);
          return router.createUrlTree([defaultRoute]);
        }

        // Allow access to requested route
        return true;
      })
    ))
  );
};
