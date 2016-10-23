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
var ModalConfirm = (function () {
    function ModalConfirm() {
        this.level = 'danger';
        this.confirmed = new core_1.EventEmitter();
        this.showModal = false;
    }
    ModalConfirm.prototype.onModalYes = function () {
        this.showModal = false;
        this.confirmed.emit(true);
    };
    ModalConfirm.prototype.onModalNo = function () {
        this.showModal = false;
        this.confirmed.emit(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ModalConfirm.prototype, "level", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ModalConfirm.prototype, "confirmed", void 0);
    ModalConfirm = __decorate([
        core_1.Component({
            selector: 'modal-confirm',
            template: "\n    <div class=\"modal\" tabindex=\"-1\" role=\"dialog\" \n      [ngStyle]=\"{'display': showModal ? 'block' : 'none'}\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header bg-primary\">\n            <button type=\"button\" \n              class=\"close\" aria-label=\"Close\" \n              (click)=\"onModalNo()\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <h4 class=\"modal-title\">\n              <ng-content select=\"[title]\"></ng-content>\n            </h4>\n          </div>\n          <div class=\"modal-body\">\n            <p>\n              <ng-content select=\"[message]\"></ng-content>\n            </p>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" \n              class=\"btn\" \n              [ngClass]=\"['btn-' + level]\"\n              (click)=\"onModalYes()\">Yes\n            </button>\n            <button type=\"button\" \n              class=\"btn btn-success\" \n              (click)=\"onModalNo()\">No\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ModalConfirm);
    return ModalConfirm;
}());
exports.ModalConfirm = ModalConfirm;
