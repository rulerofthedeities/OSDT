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
var recipient_service_1 = require('../services/recipient.service');
var error_service_1 = require('../services/error.service');
var recipient_model_1 = require('../models/recipient.model');
var Recipients = (function () {
    function Recipients(recipientService, errorService, router) {
        this.recipientService = recipientService;
        this.errorService = errorService;
        this.router = router;
        this.recipients = [];
        this.currentRecipient = null;
        this.isNew = false;
    }
    Recipients.prototype.ngOnInit = function () {
        var _this = this;
        this.getRecipients();
        this.recipientService.closed.subscribe(function (closedRecipient) { _this.currentRecipient = null; });
    };
    Recipients.prototype.getRecipients = function () {
        var _this = this;
        this.recipientService.getRecipients()
            .subscribe(function (recipients) { _this.recipients = recipients; }, function (error) { return _this.errorService.handleError(error); });
    };
    Recipients.prototype.selectRecipient = function (recipient) {
        this.currentRecipient = recipient;
    };
    Recipients.prototype.addRecipient = function () {
        this.isNew = true;
        this.currentRecipient = new recipient_model_1.Recipient('demoUser', '', '', [], true);
    };
    Recipients.prototype.selectDonations = function (recipient) {
        this.router.navigate(['/donations', recipient._id]);
    };
    Recipients = __decorate([
        core_1.Component({
            template: "\n    <div  *ngIf=\"!currentRecipient\">\n      <button\n        type=\"button\"\n        (click)=\"addRecipient()\"\n        class=\"btn btn-primary\">\n        Add Recipient\n      </button>\n\n      <ul>\n        <li *ngFor=\"let recipient of recipients\">\n          <span (click)=\"selectRecipient(recipient)\"> \n            {{recipient.name}} ({{recipient.cnt}}\n          </span> <span (click)=\"selectDonations(recipient)\">donation{{recipient.cnt === 1 ? '' :'s'}}</span>)\n        </li>\n      </ul>\n    </div>\n\n    <recipient *ngIf=\"currentRecipient\"\n      [recipient]=\"currentRecipient\"\n      [editMode]=\"isNew\">\n    </recipient>\n  "
        }), 
        __metadata('design:paramtypes', [recipient_service_1.RecipientService, error_service_1.ErrorService, router_1.Router])
    ], Recipients);
    return Recipients;
}());
exports.Recipients = Recipients;
//# sourceMappingURL=recipients.component.js.map