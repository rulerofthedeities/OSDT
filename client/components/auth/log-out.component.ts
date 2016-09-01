import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  template: `
    <section>
      <button (click)="onLogout()">Logout</button>
    </section>
  `
})

export class LogOut {

    constructor(
      private authService: AuthService,
      private router: Router
    ) {}

    onLogout() {
      this.authService.logout();
      this.router.navigate(['/auth/signin']);
    }
}
