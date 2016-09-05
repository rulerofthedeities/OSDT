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
var recipient_service_1 = require('../services/recipient.service');
var error_service_1 = require('../services/error.service');
var Recipients = (function () {
    function Recipients(recipientService, errorService) {
        this.recipientService = recipientService;
        this.errorService = errorService;
        this.recipients = [];
        this.currentRecipient = null;
    }
    Recipients.prototype.ngOnInit = function () {
        this.getRecipients();
    };
    Recipients.prototype.getRecipients = function () {
        var _this = this;
        this.recipientService.getRecipients()
            .subscribe(function (recipients) { _this.recipients = recipients; }, function (error) { return _this.errorService.handleError(error); });
    };
    Recipients.prototype.selectRecipient = function (recipient, i) {
        this.currentRecipient = recipient;
        console.log(recipient, i);
    };
    Recipients = __decorate([
        core_1.Component({
            template: "\n    <h3>Recipients</h3>\n\n    <ul>\n      <li *ngFor=\"let recipient of recipients; let i = index\"\n        (click)=\"selectRecipient(recipient, i)\"> \n        {{recipient.name}}\n      </li>\n    </ul>\n\n    <recipient *ngIf=\"currentRecipient\"\n      [recipient]=\"currentRecipient\"\n      editMode=false>\n    </recipient>\n  "
        }), 
        __metadata('design:paramtypes', [recipient_service_1.RecipientService, error_service_1.ErrorService])
    ], Recipients);
    return Recipients;
}());
exports.Recipients = Recipients;
//# sourceMappingURL=recipients.component.js.map