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
var router_1 = require('@angular/router');
var auth_service_1 = require('../../services/auth.service');
var error_service_1 = require('../../services/error.service');
var user_model_1 = require('../../models/user.model');
var SignIn = (function () {
    function SignIn(authService, router, errorService) {
        this.authService = authService;
        this.router = router;
        this.errorService = errorService;
    }
    SignIn.prototype.ngOnInit = function () {
        this.user = new user_model_1.User('', '');
    };
    SignIn.prototype.onSubmit = function (user, isValid) {
        var _this = this;
        this.authService.signin(user)
            .subscribe(function (data) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            _this.router.navigateByUrl('/');
        }, function (error) { return _this.errorService.handleError(error); });
    };
    SignIn = __decorate([
        core_1.Component({
            template: "\n    <section>\n      <form #f=\"ngForm\" novalidate (ngSubmit)=\"onSubmit(f.value, f.valid)\">\n\n        <div>\n          <label for=\"email\">Mail</label>\n          <input \n            type=\"email\" \n            class=\"form-control\" \n            name=\"email\"\n            id=\"email\"\n            [ngModel]=\"user.email\"\n            validateEmail\n            required  \n            #email=\"ngModel\">\n          <small [hidden]=\"!email?.errors?.required || (email?.pristine && !f.submitted)\">\n            Email is required.\n          </small>\n          <small [hidden]=\"!email?.errors?.invalidMail || (email?.pristine && !f.submitted)\">\n            Email format should be <i>john@doe.com</i>.\n          </small>\n          <!-- <pre *ngIf=\"email.errors\" class=\"margin-20\">{{ email.errors | json }}</pre> -->\n        </div>\n          \n        <div>\n          <label for=\"password\">Password</label>\n          <input \n            type=\"password\" \n            class=\"form-control\" \n            name=\"password\" \n            id=\"password\" \n            [ngModel]=\"user.password\" \n            required \n            #password=\"ngModel\">\n            <small [hidden]=\"!password?.errors?.required || (password?.pristine && !f.submitted)\">\n              Password is required\n            </small>\n          <!-- <pre *ngIf=\"password.errors\" class=\"margin-20\">{{ password.errors | json }}</pre> -->\n        </div>\n        <button type=\"submit\" [disabled]=\"!f.valid\">Sign In</button>\n      </form>\n    </section>"
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, error_service_1.ErrorService])
    ], SignIn);
    return SignIn;
}());
exports.SignIn = SignIn;
//# sourceMappingURL=sign-in.component.js.map