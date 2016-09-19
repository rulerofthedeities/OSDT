import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'navbar',
  template: `
  <nav role="navigation" class="navbar navbar-default">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button 
        type="button" 
        data-target="#navbarCollapse" 
        (click)="isCollapsed = !isCollapsed" 
        class="navbar-toggle"
      >
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand">OSDT</a>
    </div>
    <!-- Collection of nav links and other content for toggling -->
    <div 
      id="navbarCollapse" 
      class="collapse navbar-collapse" 
      [collapse]="isCollapsed"
    >
      <ul class="nav navbar-nav">
        <li routerLinkActive="active">
          <a routerLink="dashboard" class="item">Dashboard</a>
        </li>
        <li routerLinkActive="active">
          <a routerLink="recipients" class="item">Recipients</a>
        </li>
        <li routerLinkActive="active">
          <a routerLink="donations" class="item">Donations</a>
        </li>
        <li routerLinkActive="active">
          <a routerLink="currencies" class="item">Currencies</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right loginout">
        <li *ngIf="!isLoggedIn()" routerLinkActive="active">
          <a routerLink="auth" class="item">Login</a>
        </li>
        <li *ngIf="isLoggedIn()" routerLinkActive="active">
          <a (click)="onLogout()" class="item">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
  `,
  styles: [`
    .loginout {cursor: pointer;}
  `]
})

export class Navbar {
  isCollapsed: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/signin']);
  }
}
