import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  template: `
  <ul class="nav nav-tabs">
    <li routerLinkActive="active">
      <a [routerLink]="['signup']">Signup</a>
    </li>
    <li routerLinkActive="active" *ngIf="!isLoggedIn()">
      <a [routerLink]="['signin']">Signin</a>
    </li>
    <li routerLinkActive="active" *ngIf="isLoggedIn()">
      <a [routerLink]="['logout']">Logout</a>
    </li>
  </ul> 
  <router-outlet></router-outlet>
  `,
  styles: [`
    .active {border:1px dashed blue;}
  `]
})

export class AuthMenu {
  constructor (private authService: AuthService) {}

  isLoggedIn() {
      return this.authService.isLoggedIn();
  }
}
