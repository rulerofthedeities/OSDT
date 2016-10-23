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
var SignIn = (function () {
    function SignIn(authService, errorService) {
        this.authService = authService;
        this.errorService = errorService;
    }
    SignIn.prototype.ngOnInit = function () {
        this.user = new user_model_1.User('', '');
    };
    SignIn.prototype.onSubmit = function (user) {
        var _this = this;
        this.authService.signin(user)
            .subscribe(function (data) { return _this.authService.signedIn(data); }, function (error) { return _this.errorService.handleError(error); });
    };
    SignIn = __decorate([
        core_1.Component({
            template: "\n    <div id=\"loginbox\" style=\"margin-top:50px;\" class=\"col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\">                    \n      <div class=\"panel panel-primary\">\n        <div class=\"panel-heading\">\n          <div class=\"panel-title\">Sign In</div>\n          <div *ngIf=\"false\" style=\"float:right; font-size: 80%; position: relative; top:-10px\">\n            <a href=\"#\">Forgot password?</a>\n          </div>\n        </div>     \n        <div style=\"padding-top:30px\" class=\"panel-body bg-info\">\n          <form #f=\"ngForm\" \n            id=\"loginform\" \n            class=\"form-horizontal\" \n            role=\"form\" \n            novalidate \n            (ngSubmit)=\"onSubmit(f.value, f.valid)\">\n            \n            <div class=\"input-group\">\n              <span class=\"input-group-addon\">\n                <i class=\"glyphicon glyphicon-user\"></i>\n              </span>\n              <input id=\"email\" \n                type=\"text\" \n                class=\"form-control\" \n                name=\"email\"\n                placeholder=\"Email address\"\n                [ngModel]=\"user.email\"\n                validateEmail\n                required  \n                #email=\"ngModel\">                                       \n            </div>\n                \n            <small class=\"text-danger\" [hidden]=\"!email?.errors?.required || (email?.pristine && !f.submitted)\">\n              Email is required.\n            </small>\n            <small class=\"text-danger\" [hidden]=\"!email?.errors?.invalidMail || (email?.pristine && !f.submitted)\">\n              Email format should be <i>john@doe.com</i>.\n            </small> \n\n            <div style=\"margin-top: 25px\" class=\"input-group\">\n              <span class=\"input-group-addon\">\n                <i class=\"glyphicon glyphicon-lock\"></i>\n              </span>\n              <input id=\"login-password\" \n                type=\"password\" \n                class=\"form-control\" \n                name=\"password\" \n                placeholder=\"Password\"\n                [ngModel]=\"user.password\" \n                required \n                #password=\"ngModel\">\n            </div>\n                \n            <small class=\"text-danger\" [hidden]=\"!password?.errors?.required || (password?.pristine && !f.submitted)\">\n              Password is required\n            </small>\n\n            <div style=\"margin-top: 25px\" class=\"input-group\" *ngIf=\"false\">\n              <div class=\"checkbox\">\n                <label>\n                  <input id=\"login-remember\" type=\"checkbox\" name=\"remember\" value=\"1\"> Remember me\n                </label>\n              </div>\n            </div>\n\n            <div style=\"margin-top:25px\" class=\"form-group\">\n                <div class=\"col-sm-12 controls\">\n                  <button type=\"submit\"\n                    class=\"btn btn-success\"\n                    [disabled]=\"!f.valid\">\n                    Sign In\n                  </button>\n                </div>\n            </div>\n\n            <error-msg></error-msg>\n\n            <div class=\"form-group\">\n              <div class=\"col-md-12 control\">\n                <div style=\"border-top: 1px solid#888; padding-top:15px; font-size:85%\" >\n                  Don't have an account?\n                    <a routerLink=\"/auth/signup\">Sign Up Here</a>\n                </div>\n              </div>\n            </div>    \n          </form>     \n        </div>                     \n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, error_service_1.ErrorService])
    ], SignIn);
    return SignIn;
}());
exports.SignIn = SignIn;
