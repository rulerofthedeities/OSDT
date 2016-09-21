import {Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService } from '../../services/auth.service';
import {ErrorService} from '../../services/error.service';
import {User} from '../../models/user.model';

@Component({
  template: `
    <div id="signupbox" style="margin-top:50px" class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <div class="panel-title">Sign Up</div>
          <div class="signin">
            <a routerLink="/auth/signin">Sign In</a>
          </div>
        </div>  
        <div class="panel-body bg-info">
          <form id="signupform"
            #f="ngForm"
            class="form-horizontal"
            role="form"
            novalidate 
            (ngSubmit)="onSubmit(f.value, f.valid)">
              
            <div class="form-group">
              <label for="username" class="col-md-3 control-label">User Name</label>
              <div class="col-md-9">
                <input 
                  type="text" 
                  class="form-control"
                  name="username" 
                  placeholder="User Name"
                  [ngModel]="user.userName" 
                  (change)="checkUniqueUser(username.value)"
                  required 
                  minlength="5" 
                  maxlength="16" 
                  #username="ngModel">
                <small class="text-danger" *ngIf="username.touched && userInUse">
                  This user name is already in use.
                </small>
                <small class="text-danger" [hidden]="!username?.errors?.required || (username?.pristine && !f.submitted)">
                  User name is required.
                </small>
                <small class="text-danger" [hidden]="!username?.errors?.minlength || (username?.pristine && !f.submitted)">
                  User name must have a minimum of {{username?.errors?.minlength?.requiredLength}} characters.
                </small>
              </div>
            </div>


            <div class="form-group">
              <label for="email" class="col-md-3 control-label">Email</label>
              <div class="col-md-9">
                <input 
                  id="email"
                  type="text" 
                  class="form-control" 
                  name="email" 
                  placeholder="Email Address"
                  [ngModel]="user.email" 
                  (change)="checkUniqueEmail(email.value)"
                  validateEmail
                  required  
                  #email="ngModel">
                <small class="text-danger" *ngIf="email?.touched && mailInUse">
                  This email address is already in use.
                </small>
                <small class="text-danger" [hidden]="!email?.errors?.required || (email?.pristine && !f.submitted)">
                  Email is required.
                </small>
                <small class="text-danger" [hidden]="!email?.errors?.invalidMail || (email?.pristine && !f.submitted)">
                  Email format should be <i>john@doe.com</i>.
                </small>
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="col-md-3 control-label">Password</label>
              <div class="col-md-9">
                <input id="password"
                  type="password" 
                  class="form-control" 
                  name="passwd" 
                  placeholder="Password"
                  [ngModel]="user.password" 
                  required 
                  minlength="5"
                  validateEqual="confirmPassword" 
                  reverse="true" 
                  #password="ngModel">
                <small class="text-danger" [hidden]="!password?.errors?.required || (password?.pristine && !f.submitted)">
                  Password is required
                </small>
                <small class="text-danger" [hidden]="!password?.errors?.minlength || (password?.pristine && !f.submitted)">
                  User name must have a minimum of {{password?.errors?.minlength?.requiredLength}} characters.
                </small>
              </div>
            </div>
                
            <div class="form-group">
              <label for="confirmPassword" class="col-md-3 control-label">Retype password</label>
              <div class="col-md-9">
                <input id="confirmPassword"
                  type="password" 
                  class="form-control" 
                  name="confirmPassword" 
                  placeholder="Password"
                  [ngModel]="user.confirmPassword" 
                  required 
                  validateEqual="password" 
                  reverse="false" 
                  #confirmPassword="ngModel">
                <small class="text-danger" [hidden]="confirmPassword?.valid || (confirmPassword?.pristine && !f.submitted)">
                  Password mismatch
                </small>
              </div>
            </div>

            <div class="form-group">                                
              <div class="col-md-offset-3 col-md-9">
                <button type="submit" class="btn btn-success" [disabled]="!f.valid">
                  <i class="glyphicon glyphicon-hand-right"></i> &nbsp;&nbsp; Sign Up
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>`,
  styles:[`
    div.signin {
      float:right;
      font-size: 85%;
      position: relative; 
      top:-10px;
    }
    div.signin a {
      color:snow;
    }
  `]
})

export class SignUp implements OnInit {
  userForm: FormGroup;
  user: User;
  mailInUse: boolean;
  userInUse: boolean;

  constructor(
    private authService: AuthService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.user = new User('', '');
  }

  onSubmit(user:User, isValid:boolean) {
    if (isValid) {
      console.log(user, isValid);
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
