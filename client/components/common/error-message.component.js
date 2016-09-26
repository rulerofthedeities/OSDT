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
var error_service_1 = require('../../services/error.service');
var ErrorMessage = (function () {
    function ErrorMessage(errorService) {
        this.errorService = errorService;
        this.showError = false;
    }
    ErrorMessage.prototype.onErrorHandled = function () {
        this.showError = false;
    };
    ErrorMessage.prototype.ngOnInit = function () {
        var _this = this;
        this.errorService.errorOccurred.subscribe(function (errorData) {
            _this.errorData = errorData;
            _this.showError = true;
        });
    };
    ErrorMessage = __decorate([
        core_1.Component({
            selector: 'error-msg',
            template: "\n      <div *ngIf=\"false\">\n        <h4 class=\"modal-title\">{{errorData?.title}}</h4>\n        <p>{{errorData?.message}}</p>\n      </div>\n    "
        }), 
        __metadata('design:paramtypes', [error_service_1.ErrorService])
    ], ErrorMessage);
    return ErrorMessage;
}());
exports.ErrorMessage = ErrorMessage;
//# sourceMappingURL=error-message.component.js.map