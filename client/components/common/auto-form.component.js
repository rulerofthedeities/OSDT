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
var AutoForm = (function () {
    function AutoForm() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AutoForm.prototype, "fields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], AutoForm.prototype, "form", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutoForm.prototype, "data", void 0);
    AutoForm = __decorate([
        core_1.Component({
            selector: 'auto-form',
            template: "\n  <div *ngFor=\"let field of fields\" class=\"form-group\">\n    <auto-field \n      [field]=\"field\"\n      [data]=\"data\"\n      [form]=\"form\">\n    </auto-field>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AutoForm);
    return AutoForm;
}());
exports.AutoForm = AutoForm;
