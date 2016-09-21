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
            console.log(user, isValid);
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
            template: "\n    <div id=\"signupbox\" style=\"margin-top:50px\" class=\"col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\">\n      <div class=\"panel panel-primary\">\n        <div class=\"panel-heading\">\n          <div class=\"panel-title\">Sign Up</div>\n          <div class=\"signin\">\n            <a routerLink=\"/auth/signin\">Sign In</a>\n          </div>\n        </div>  \n        <div class=\"panel-body bg-info\">\n          <form id=\"signupform\"\n            #f=\"ngForm\"\n            class=\"form-horizontal\"\n            role=\"form\"\n            novalidate \n            (ngSubmit)=\"onSubmit(f.value, f.valid)\">\n              \n            <div class=\"form-group\">\n              <label for=\"username\" class=\"col-md-3 control-label\">User Name</label>\n              <div class=\"col-md-9\">\n                <input \n                  type=\"text\" \n                  class=\"form-control\"\n                  name=\"username\" \n                  placeholder=\"User Name\"\n                  [ngModel]=\"user.userName\" \n                  (change)=\"checkUniqueUser(username.value)\"\n                  required \n                  minlength=\"5\" \n                  maxlength=\"16\" \n                  #username=\"ngModel\">\n                <small class=\"text-danger\" *ngIf=\"username.touched && userInUse\">\n                  This user name is already in use.\n                </small>\n                <small class=\"text-danger\" [hidden]=\"!username?.errors?.required || (username?.pristine && !f.submitted)\">\n                  User name is required.\n                </small>\n                <small class=\"text-danger\" [hidden]=\"!username?.errors?.minlength || (username?.pristine && !f.submitted)\">\n                  User name must have a minimum of {{username?.errors?.minlength?.requiredLength}} characters.\n                </small>\n              </div>\n            </div>\n\n\n            <div class=\"form-group\">\n              <label for=\"email\" class=\"col-md-3 control-label\">Email</label>\n              <div class=\"col-md-9\">\n                <input \n                  id=\"email\"\n                  type=\"text\" \n                  class=\"form-control\" \n                  name=\"email\" \n                  placeholder=\"Email Address\"\n                  [ngModel]=\"user.email\" \n                  (change)=\"checkUniqueEmail(email.value)\"\n                  validateEmail\n                  required  \n                  #email=\"ngModel\">\n                <small class=\"text-danger\" *ngIf=\"email?.touched && mailInUse\">\n                  This email address is already in use.\n                </small>\n                <small class=\"text-danger\" [hidden]=\"!email?.errors?.required || (email?.pristine && !f.submitted)\">\n                  Email is required.\n                </small>\n                <small class=\"text-danger\" [hidden]=\"!email?.errors?.invalidMail || (email?.pristine && !f.submitted)\">\n                  Email format should be <i>john@doe.com</i>.\n                </small>\n              </div>\n            </div>\n\n            <div class=\"form-group\">\n              <label for=\"password\" class=\"col-md-3 control-label\">Password</label>\n              <div class=\"col-md-9\">\n                <input id=\"password\"\n                  type=\"password\" \n                  class=\"form-control\" \n                  name=\"passwd\" \n                  placeholder=\"Password\"\n                  [ngModel]=\"user.password\" \n                  required \n                  minlength=\"5\"\n                  validateEqual=\"confirmPassword\" \n                  reverse=\"true\" \n                  #password=\"ngModel\">\n                <small class=\"text-danger\" [hidden]=\"!password?.errors?.required || (password?.pristine && !f.submitted)\">\n                  Password is required\n                </small>\n                <small class=\"text-danger\" [hidden]=\"!password?.errors?.minlength || (password?.pristine && !f.submitted)\">\n                  User name must have a minimum of {{password?.errors?.minlength?.requiredLength}} characters.\n                </small>\n              </div>\n            </div>\n                \n            <div class=\"form-group\">\n              <label for=\"confirmPassword\" class=\"col-md-3 control-label\">Retype password</label>\n              <div class=\"col-md-9\">\n                <input id=\"confirmPassword\"\n                  type=\"password\" \n                  class=\"form-control\" \n                  name=\"confirmPassword\" \n                  placeholder=\"Password\"\n                  [ngModel]=\"user.confirmPassword\" \n                  required \n                  validateEqual=\"password\" \n                  reverse=\"false\" \n                  #confirmPassword=\"ngModel\">\n                <small class=\"text-danger\" [hidden]=\"confirmPassword?.valid || (confirmPassword?.pristine && !f.submitted)\">\n                  Password mismatch\n                </small>\n              </div>\n            </div>\n\n            <div class=\"form-group\">                                \n              <div class=\"col-md-offset-3 col-md-9\">\n                <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!f.valid\">\n                  <i class=\"glyphicon glyphicon-hand-right\"></i> &nbsp;&nbsp; Sign Up\n                </button>\n              </div>\n            </div>\n\n          </form>\n        </div>\n      </div>\n    </div>",
            styles: ["\n    div.signin {\n      float:right;\n      font-size: 85%;\n      position: relative; \n      top:-10px;\n    }\n    div.signin a {\n      color:snow;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, error_service_1.ErrorService])
    ], SignUp);
    return SignUp;
}());
exports.SignUp = SignUp;
//# sourceMappingURL=sign-up.component.js.map