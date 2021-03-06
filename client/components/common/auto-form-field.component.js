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
var field_model_1 = require('../../models/fields/field.model');
var AutoFormField = (function () {
    function AutoFormField() {
    }
    Object.defineProperty(AutoFormField.prototype, "isValid", {
        get: function () { return this.form.controls[this.field.key].valid; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', field_model_1.Field)
    ], AutoFormField.prototype, "field", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], AutoFormField.prototype, "form", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutoFormField.prototype, "data", void 0);
    AutoFormField = __decorate([
        core_1.Component({
            selector: 'auto-field',
            template: "\n    <div [formGroup]=\"form\">\n      <label \n        [attr.for]=\"field.key\"\n        class=\"control-label col-xs-2\">\n        {{field.label}}\n      </label>\n\n      <div [ngSwitch]=\"field.controlType\" class=\"col-xs-10\">\n        <input \n          *ngSwitchCase=\"'textbox'\" \n          class=\"form-control\"\n          [placeholder]=\"field.placeholder\"\n          [readonly]=\"field.readonly\"\n          [formControlName]=\"field.key\"\n          [id]=\"field.key\"\n          [type]=\"field.type\">\n\n        <input \n          *ngSwitchCase=\"'date'\" \n          style=\"max-width:200px;\"\n          class=\"form-control\"\n          [placeholder]=\"field.placeholder\"\n          [readonly]=\"field.readonly\"\n          [formControlName]=\"field.key\"\n          [id]=\"field.key\"\n          type=\"date\">\n\n        <textarea \n          *ngSwitchCase=\"'textarea'\" \n          class=\"form-control\"\n          [placeholder]=\"field.placeholder\"\n          [readonly]=\"field.readonly\"\n          [rows]=\"field.rows\"\n          [cols]=\"field.cols\"\n          [formControlName]=\"field.key\"\n          [id]=\"field.key\">\n        </textarea>\n\n        <select \n          class=\"form-control\"\n          [id]=\"field.key\" \n          [formControlName]=\"field.key\"\n          *ngSwitchCase=\"'dropdown'\">\n          <option \n            *ngFor=\"let opt of field.options\" \n            [value]=\"opt.key\">\n            {{opt.display}}\n          </option>\n        </select>\n\n        <div *ngSwitchCase=\"'radio'\">\n          <div *ngFor=\"let button of field.buttons\">\n            <label class=\"radio-inline\">\n              <input \n                type=\"radio\"\n                [value]=\"button.key\" \n                [formControlName]=\"field.key\">\n                {{button.display}}\n              </label>\n          </div>\n        </div>\n        \n        <div *ngSwitchCase=\"'checkbox'\">\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">\n              <input \n                [formControlName]=\"field.key\"\n                [id]=\"field.key\" \n                type=\"checkbox\">\n            </span>\n            <span class=\"form-control\">{{field.display}}</span>\n        </div>\n\n      </div>\n      <field-messages \n        [control]=\"form.controls[field.key]\"\n        [label]=\"field.label\">\n      </field-messages>\n    </div>\n  ",
            styleUrls: ["client/components/form.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], AutoFormField);
    return AutoFormField;
}());
exports.AutoFormField = AutoFormField;
