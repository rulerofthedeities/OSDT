import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ErrorService} from '../services/error.service';
import {Subscription}   from 'rxjs/Subscription';
import {UserAccess} from '../models/user.model';

@Component({
  selector: 'navbar',
  template: `
  <div class="row">
    <div class="small text-right user" 
      *ngIf="isLoggedIn()"
      (click)="getUserAccess()">
      <span class="fa" [ngClass]="{'fa-chevron-right':!showAccess, 'fa-chevron-down':showAccess}"></span>
      {{getUserName()}}
      <div *ngIf="showAccess" id="accesswrapper">
        <ul class="list-unstyled">
          <li><strong>level</strong>: {{access?.level | levelName}}</li>
          <li><strong>roles</strong>: {{access?.roles?.length > 0 ? access?.roles.join(', ') : 'no roles'}}</li>
        </ul>
      </div>
    </div>
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
        <a class="navbar-brand">
          <img src="assets/img/osdt_logo.png" alt="OSDT" id="logo">OSDT
        </a>
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
  </div>
  `,
  styles: [`
    #logo {
      width: 32px;
      height: 32px;
      float: left;
      margin-right: 10px;
      top:-6px;
      position:relative;
    }
    .loginout {cursor: pointer;}
    .user {
      font-style: italic;
      color:DarkGrey;
      cursor: pointer;
    }
    .nav li a {
      line-height: 50px;
      height: 50px;
      font-size: 1.5em;
      padding-top: 0;
    }
    #accesswrapper {
      color:white;
      z-index:3;
      position: absolute;
      width:120px;
      display: inline;
    }
    #accesswrapper > ul {
      background-color:white;
      border: 1px solid black;
      color:black;
      position: relative;
      left:-120px;
      top:16px;
      padding:6px;
      border-radius: 5px;
      text-align:left;
    }
  `]
})

export class Navbar {
  isCollapsed: boolean = true;
  subscription: Subscription;
  access: UserAccess;
  showAccess: boolean = false;

  constructor(
    private authService: AuthService,
    private errorService: ErrorService,
    private route: ActivatedRoute
  ) {}


  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
  }

  getUserName() {
    return this.authService.getUserName();
  }

  getUserAccess() {
    this.showAccess = !this.showAccess;
    if (this.showAccess) {
      this.access = this.authService.getUserAccess();
      if (!this.access) {
        this.authService.fetchUserAccess().subscribe(
          access => {this.authService.setUserAccess(access);this.access = access;},
          error => this.errorService.handleError(error)
        );
      }
    }
  }

}
