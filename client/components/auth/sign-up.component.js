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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var auth_service_1 = require('../../services/auth.service');
var error_service_1 = require('../../services/error.service');
var validation_service_1 = require('../../services/validation.service');
var SignUp = (function () {
    function SignUp(formBuilder, authService, errorService, router, http) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.errorService = errorService;
        this.router = router;
        this.http = http;
    }
    SignUp.prototype.ngOnInit = function () {
        this.buildForm();
    };
    SignUp.prototype.buildForm = function () {
        this.userForm = this.formBuilder.group({
            'userName': ['', forms_1.Validators.required, validation_service_1.ValidationService.checkUniqueUserName(this.http)],
            'email': ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator], validation_service_1.ValidationService.checkUniqueEmail(this.http)],
            'password': ['', [forms_1.Validators.required, validation_service_1.ValidationService.passwordValidator]],
            'confirmPassword': ['', forms_1.Validators.required]
        }, { validator: validation_service_1.ValidationService.equalPasswordsValidator });
    };
    SignUp.prototype.onSubmitForm = function (user) {
        var _this = this;
        if (this.userForm.valid) {
            this.authService.signup(user).subscribe(function (data) {
                _this.authService.signin(user).subscribe(function (data) {
                    _this.authService.storeUserData(data);
                    _this.router.navigateByUrl('/recipients');
                }, function (error) { return _this.errorService.handleError(error); });
            }, function (error) { return _this.errorService.handleError(error); });
        }
    };
    SignUp = __decorate([
        core_1.Component({
            template: "\n    <div id=\"signupbox\" style=\"margin-top:50px\" class=\"col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\">\n      <div class=\"panel panel-primary\">\n        <div class=\"panel-heading\">\n          <div class=\"panel-title\">Sign Up</div>\n          <div class=\"signin\">\n            <a routerLink=\"/auth/signin\">Sign In</a>\n          </div>\n        </div>  \n        <div class=\"panel-body bg-info\">\n          <form id=\"signupform\"\n            [formGroup]=\"userForm\"\n            class=\"form-horizontal\"\n            role=\"form\">\n\n            <div class=\"form-group\">\n              <label for=\"username\" class=\"col-md-3 control-label\">User Name</label>\n              <div class=\"col-md-9\">\n                <input \n                  type=\"text\" \n                  class=\"form-control\"\n                  name=\"username\" \n                  placeholder=\"User Name\"\n                  formControlName=\"userName\" \n                  minlength=\"5\" \n                  maxlength=\"16\">\n                <field-messages \n                  [control]=\"userForm.controls.userName\"\n                  [label]=\"'User name'\">\n                </field-messages>\n              </div>\n            </div>\n\n            <div class=\"form-group\">\n              <label for=\"email\" class=\"col-md-3 control-label\">Email</label>\n              <div class=\"col-md-9\">\n                <input \n                  id=\"email\"\n                  type=\"text\" \n                  class=\"form-control\" \n                  name=\"email\" \n                  placeholder=\"Email Address\"\n                  formControlName=\"email\">\n                <field-messages \n                  [control]=\"userForm.controls.email\"\n                  [label]=\"'Email'\">\n                </field-messages>\n              </div>\n            </div>\n\n            <div class=\"form-group\">\n              <label for=\"password\" class=\"col-md-3 control-label\">Password</label>\n              <div class=\"col-md-9\">\n                <input id=\"password\"\n                  type=\"password\" \n                  class=\"form-control\" \n                  name=\"passwd\" \n                  placeholder=\"Password\"\n                  formControlName=\"password\" >\n                <field-messages \n                  [control]=\"userForm.controls.password\"\n                  [label]=\"'Password'\">\n                </field-messages>\n              </div>\n            </div>\n                \n            <div class=\"form-group\">\n              <label for=\"confirmPassword\" class=\"col-md-3 control-label\">Retype password</label>\n              <div class=\"col-md-9\">\n                <input id=\"confirmPassword\"\n                  type=\"password\" \n                  class=\"form-control\" \n                  name=\"confirmPassword\" \n                  placeholder=\"Password\"\n                  formControlName=\"confirmPassword\" >\n                <field-messages \n                  [control]=\"userForm.controls.confirmPassword\"\n                  [label]=\"'Password Confirmation'\">\n                </field-messages>\n                <div class=\"text-danger\" *ngIf=\"userForm.errors?.mismatchingPasswords\">The passwords don't match</div>\n              </div>\n            </div>\n\n            <div class=\"form-group\">                                \n              <div class=\"col-md-offset-3 col-md-9\">\n                <button type=\"button\" \n                  class=\"btn btn-success\"\n                  [disabled]=\"!userForm.valid\"\n                  (click)=\"onSubmitForm(userForm.value)\">\n                  <i class=\"glyphicon glyphicon-hand-right\"></i> &nbsp;&nbsp; Sign Up\n                </button>\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>",
            styles: ["\n    div.signin {\n      float:right;\n      font-size: 85%;\n      position: relative; \n      top:-10px;\n    }\n    div.signin a {\n      color:snow;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, auth_service_1.AuthService, error_service_1.ErrorService, router_1.Router, http_1.Http])
    ], SignUp);
    return SignUp;
}());
exports.SignUp = SignUp;
//# sourceMappingURL=sign-up.component.js.map