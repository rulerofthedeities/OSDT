"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var auth_service_1 = require('../../services/auth.service');
var error_service_1 = require('../../services/error.service');
var user_model_1 = require('../../models/user.model');
var SignUp = (function () {
    function SignUp(authService, errorService) {
        this.authService = authService;
        this.errorService = errorService;
    }
    SignUp.prototype.ngOnInit = function () {
        this.user = new user_model_1.User('', '');
    };
    SignUp.prototype.onSubmit = function (user, isValid) {
        var _this = this;
        if (isValid) {
            this.authService.signup(user)
                .subscribe(function (data) { ; }, function (err) { return _this.errorService.handleError(err); });
        }
    };
    SignUp.prototype.checkUniqueEmail = function (email) {
        var _this = this;
        if (email) {
            this.authService.checkEmail(email)
                .subscribe(function (exists) { _this.mailInUse = exists.obj; }, function (err) { return _this.errorService.handleError(err); });
        }
    };
    SignUp.prototype.checkUniqueUser = function (userName) {
        var _this = this;
        if (userName) {
            this.authService.checkUserName(userName)
                .subscribe(function (exists) { _this.userInUse = exists.obj; }, function (err) { return _this.errorService.handleError(err); });
        }
    };
    SignUp = __decorate([
        core_1.Component({
            template: "\n    <section>\n      <form #f=\"ngForm\" novalidate (ngSubmit)=\"onSubmit(f.value, f.valid)\">\n\n        <div>\n          <label for=\"username\">User Name</label>\n          <input \n            type=\"text\" \n            class=\"form-control\" \n            name=\"userName\" \n            id=\"userName\" \n            [ngModel]=\"user.userName\" \n            (change)=\"checkUniqueUser(username.value)\"\n            required \n            minlength=\"5\" \n            maxlength=\"16\" \n            #username=\"ngModel\">\n          <small *ngIf=\"username.touched && userInUse\">\n            This user name is already in use.\n          </small>\n          <small [hidden]=\"!username?.errors?.required || (username?.pristine && !f.submitted)\">\n            User name is required.\n          </small>\n          <small [hidden]=\"!username?.errors?.minlength || (username?.pristine && !f.submitted)\">\n            User name must have a minimum of {{username?.errors?.minlength?.requiredLength}} characters.\n          </small>\n          <!-- <pre *ngIf=\"username.errors\" class=\"margin-20\">{{ username.errors | json }}</pre> -->\n        </div>\n\n        <div>\n          <label for=\"email\">Mail</label>\n          <input \n            type=\"email\" \n            class=\"form-control\" \n            name=\"email\"\n            id=\"email\"\n            [ngModel]=\"user.email\" \n            (change)=\"checkUniqueEmail(email.value)\"\n            validateEmail\n            required  \n            #email=\"ngModel\">\n          <small *ngIf=\"email?.touched && mailInUse\">\n            This email address is already in use.\n          </small>\n          <small [hidden]=\"!email?.errors?.required || (email?.pristine && !f.submitted)\">\n            Email is required.\n          </small>\n          <small [hidden]=\"!email?.errors?.invalidMail || (email?.pristine && !f.submitted)\">\n            Email format should be <i>john@doe.com</i>.\n          </small>\n          <!-- <pre *ngIf=\"email.errors\" class=\"margin-20\">{{ email.errors | json }}</pre> -->\n        </div>\n\n        <div>\n          <label for=\"password\">Password</label>\n          <input \n            type=\"password\" \n            class=\"form-control\" \n            name=\"password\" \n            id=\"password\" \n            [ngModel]=\"user.password\" \n            required \n            minlength=\"5\"\n            validateEqual=\"confirmPassword\" \n            reverse=\"true\" \n            #password=\"ngModel\">\n            <small [hidden]=\"!password?.errors?.required || (password?.pristine && !f.submitted)\">\n              Password is required\n            </small>\n          <small [hidden]=\"!password?.errors?.minlength || (password?.pristine && !f.submitted)\">\n            User name must have a minimum of {{password?.errors?.minlength?.requiredLength}} characters.\n          </small>\n          <!-- <pre *ngIf=\"password.errors\" class=\"margin-20\">{{ password.errors | json }}</pre> -->\n        </div>\n\n        <div>\n          <label for=\"confirmPassword\">Retype password</label>\n          <input \n            type=\"password\" \n            class=\"form-control\" \n            name=\"confirmPassword\" \n            id=\"confirmPassword\" \n            [ngModel]=\"user.confirmPassword\" \n            required \n            validateEqual=\"password\" \n            reverse=\"false\" \n            #confirmPassword=\"ngModel\">\n          <small [hidden]=\"confirmPassword?.valid || (confirmPassword?.pristine && !f.submitted)\">\n            Password mismatch\n          </small>\n          <!-- <pre *ngIf=\"confirmPassword.errors\" class=\"margin-20\">{{ confirmPassword.errors | json }}</pre> -->\n        </div>\n\n        <button type=\"submit\" [disabled]=\"!f.valid\">Sign Up</button>\n      </form>\n    </section>\n  "
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, error_service_1.ErrorService])
    ], SignUp);
    return SignUp;
}());
exports.SignUp = SignUp;
//# sourceMappingURL=sign-up.component.js.map