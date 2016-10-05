import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    protected router: Router,
    protected authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url !== '/auth/signin' && !this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/signin']);
      return false;
    } else {
      return true;
    }
  }
}
