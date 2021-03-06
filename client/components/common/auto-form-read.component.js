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
var AutoFormRead = (function () {
    function AutoFormRead() {
        this.fields = {};
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutoFormRead.prototype, "fields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutoFormRead.prototype, "data", void 0);
    AutoFormRead = __decorate([
        core_1.Component({
            selector: 'auto-form-read',
            template: "\n  <div *ngFor=\"let field of fields\" class=\"row\">\n    <label \n      [attr.for]=\"field.key\"\n      class=\"control-label col-xs-2 text-right\">\n      {{field.label}}\n    </label>\n    <div class=\"col-xs-10\" [id]=\"field.key\">\n      <div [ngSwitch]=\"field.controlType\">\n        <span *ngSwitchCase=\"'checkbox'\">\n          <span class=\"fa\" \n            [ngClass]=\"{'fa-check':data[field.key],'fa-times':!data[field.key]}\"\n            [ngStyle]=\"{'color':data[field.key] ? 'green' : 'red'}\">\n          </span>\n        </span>\n        <span *ngSwitchCase=\"'date'\">\n          {{data[field.key] | date:'longDate' }}\n        </span>\n        <span *ngSwitchDefault>\n          {{data[field.key] | formatField:field }}\n        </span>\n      </div>\n    </div>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AutoFormRead);
    return AutoFormRead;
}());
exports.AutoFormRead = AutoFormRead;
