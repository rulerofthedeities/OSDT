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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var EmailValidator = (function () {
    function EmailValidator(validateEmail) {
        ;
    }
    EmailValidator.prototype.validate = function (c) {
        // self value
        var v = c.value;
        //value matches pattern
        if (v && !v.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
            return { invalidMail: true };
        }
        return null;
    };
    EmailValidator = __decorate([
        core_1.Directive({
            selector: '[validateEmail][formControlName],[validateEmail][formControl],[validateEmail][ngModel]',
            providers: [
                core_1.provide(forms_1.NG_VALIDATORS, { useExisting: core_1.forwardRef(function () { return EmailValidator; }), multi: true })
            ]
        }),
        __param(0, core_1.Attribute('validateEmail')), 
        __metadata('design:paramtypes', [String])
    ], EmailValidator);
    return EmailValidator;
}());
exports.EmailValidator = EmailValidator;
//# sourceMappingURL=email-validator.directive.js.map