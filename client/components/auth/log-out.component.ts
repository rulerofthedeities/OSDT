import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'logout',
  template: `
    <a (click)="onLogout()" class="item">Logout</a>
  `
})

export class LogOut {

  constructor(
    private authService: AuthService
  ) {}

  onLogout() {
    this.authService.logout();
  }
}
