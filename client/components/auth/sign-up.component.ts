import {Component, OnInit } from '@angular/core';
import {AuthService } from '../../services/auth.service';
import {ErrorService} from '../../services/error.service';
import {User} from '../../models/user.model';

@Component({
  template: `
    <section>
      <form #f="ngForm" novalidate (ngSubmit)="onSubmit(f.value, f.valid)">

        <div>
          <label for="username">User Name</label>
          <input 
            type="text" 
            class="form-control" 
            name="userName" 
            id="userName" 
            [ngModel]="user.userName" 
            (change)="checkUniqueUser(username.value)"
            required 
            minlength="5" 
            maxlength="16" 
            #username="ngModel">
          <small *ngIf="username.touched && userInUse">
            This user name is already in use.
          </small>
          <small [hidden]="!username?.errors?.required || (username?.pristine && !f.submitted)">
            User name is required.
          </small>
          <small [hidden]="!username?.errors?.minlength || (username?.pristine && !f.submitted)">
            User name must have a minimum of {{username?.errors?.minlength?.requiredLength}} characters.
          </small>
          <!-- <pre *ngIf="username.errors" class="margin-20">{{ username.errors | json }}</pre> -->
        </div>

        <div>
          <label for="email">Mail</label>
          <input 
            type="email" 
            class="form-control" 
            name="email"
            id="email"
            [ngModel]="user.email" 
            (change)="checkUniqueEmail(email.value)"
            validateEmail
            required  
            #email="ngModel">
          <small *ngIf="email?.touched && mailInUse">
            This email address is already in use.
          </small>
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
            minlength="5"
            validateEqual="confirmPassword" 
            reverse="true" 
            #password="ngModel">
            <small [hidden]="!password?.errors?.required || (password?.pristine && !f.submitted)">
              Password is required
            </small>
          <small [hidden]="!password?.errors?.minlength || (password?.pristine && !f.submitted)">
            User name must have a minimum of {{password?.errors?.minlength?.requiredLength}} characters.
          </small>
          <!-- <pre *ngIf="password.errors" class="margin-20">{{ password.errors | json }}</pre> -->
        </div>

        <div>
          <label for="confirmPassword">Retype password</label>
          <input 
            type="password" 
            class="form-control" 
            name="confirmPassword" 
            id="confirmPassword" 
            [ngModel]="user.confirmPassword" 
            required 
            validateEqual="password" 
            reverse="false" 
            #confirmPassword="ngModel">
          <small [hidden]="confirmPassword?.valid || (confirmPassword?.pristine && !f.submitted)">
            Password mismatch
          </small>
          <!-- <pre *ngIf="confirmPassword.errors" class="margin-20">{{ confirmPassword.errors | json }}</pre> -->
        </div>

        <button type="submit" [disabled]="!f.valid">Sign Up</button>
      </form>
    </section>
  `
})

export class SignUp implements OnInit {
  user: User;
  mailInUse: boolean;
  userInUse: boolean;

  constructor(
    private authService: AuthService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.user = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  onSubmit(user:User, isValid:boolean) {
    if (isValid) {
      this.authService.signup(user)
        .subscribe(
          data => {;},
          err => this.errorService.handleError(err)
        );
    }
  }

  checkUniqueEmail(email: string) {
    if (email) {
      this.authService.checkEmail(email)
        .subscribe(
          exists => {this.mailInUse = exists.obj;},
          err => this.errorService.handleError(err)
        );
    }
  }

  checkUniqueUser(userName: string) {
    if (userName) {
      this.authService.checkUserName(userName)
        .subscribe(
          exists => {this.userInUse = exists.obj;},
          err => this.errorService.handleError(err)
        );
    }
  }
}
