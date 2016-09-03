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
var field_control_service_1 = require('../../services/field-control.service');
var AutoForm = (function () {
    function AutoForm(fieldControlService) {
        this.fieldControlService = fieldControlService;
        this.fields = [];
        this.submitted = '';
    }
    AutoForm.prototype.ngOnInit = function () {
        this.form = this.fieldControlService.toFormGroup(this.fields);
    };
    AutoForm.prototype.onSubmit = function () {
        this.submitted = JSON.stringify(this.form.value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AutoForm.prototype, "fields", void 0);
    AutoForm = __decorate([
        core_1.Component({
            selector: 'auto-form',
            template: "\n    <form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n\n      <div *ngFor=\"let field of fields\" class=\"form-row\">\n        <auto-field \n          [field]=\"field\" \n          [form]=\"form\">    \n        </auto-field>\n      </div>\n\n      <div class=\"form-row\">\n        <button type=\"submit\" [disabled]=\"!form.valid\">Save</button>\n      </div>\n    </form>\n\n    <div *ngIf=\"submitted\" class=\"form-row\">\n      <strong>Data submitted:</strong><br>{{submitted}}\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [field_control_service_1.FieldControlService])
    ], AutoForm);
    return AutoForm;
}());
exports.AutoForm = AutoForm;
//# sourceMappingURL=auto-form.component.js.map