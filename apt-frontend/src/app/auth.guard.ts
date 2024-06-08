// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      take(1),
      map(isLoggedIn => {
        console.log('AuthGuard: isLoggedIn:', isLoggedIn);
        if (!isLoggedIn) {
          // Check if the route is for admin or doctor
          const isDoctorRoute = state.url.includes('/doctor');
          return this.router.createUrlTree([isDoctorRoute ? '/doctor-login' : '/login/superuser']);
        }
        return true;
      })
    );
  }
}
