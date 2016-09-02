import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {ErrorService} from '../../services/error.service';
import {User} from '../../models/user.model';

@Component({
  template: `
    <section>
      <form #f="ngForm" novalidate (ngSubmit)="onSubmit(f.value, f.valid)">

        <div>
          <label for="email">Mail</label>
          <input 
            type="email" 
            class="form-control" 
            name="email"
            id="email"
            [ngModel]="user.email"
            validateEmail
            required  
            #email="ngModel">
          <small [hidden]="!email?.errors?.required || (email?.pristine && !f.submitted)">
            Email is required.
          </small>
          <small [hidden]="!email?.errors?.invalidMail || (email?.pristine && !f.submitted)">
            Email format should be <i>john@doe.com</i>.
          </small>
          <!-- <pre *ngIf="email.errors" class="margin-20">{{ email.errors | json }}</pre> -->
        </div>
          
        <div>
          <label for="password">Password</label>
          <input 
            type="password" 
            class="form-control" 
            name="password" 
            id="password" 
            [ngModel]="user.password" 
            required 
            #password="ngModel">
            <small [hidden]="!password?.errors?.required || (password?.pristine && !f.submitted)">
              Password is required
            </small>
          <!-- <pre *ngIf="password.errors" class="margin-20">{{ password.errors | json }}</pre> -->
        </div>
        <button type="submit" [disabled]="!f.valid">Sign In</button>
      </form>
    </section>`
})

export class SignIn implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.user = new User('', '');
  }

  onSubmit(user: User, isValid: boolean) {
    this.authService.signin(user)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.router.navigateByUrl('/');
        },
        error => this.errorService.handleError(error)
      );
  }
}
