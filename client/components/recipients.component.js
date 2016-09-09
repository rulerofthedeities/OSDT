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
        this.selectedRecipient = null;
        this.isEdit = false;
        this.isNew = false;
        this.prevNavState = 'view'; //view if closing/canceling must lead back to view
    }
    Recipients.prototype.ngOnInit = function () {
        var _this = this;
        this.getRecipients();
        this.recipientService.closeToView.subscribe(function (closedRecipient) {
            _this.getRecipients();
            _this.currentRecipient = null;
        });
    };
    Recipients.prototype.getRecipients = function () {
        var _this = this;
        this.recipientService.getRecipients(false)
            .subscribe(function (recipients) { _this.recipients = recipients; }, function (error) { return _this.errorService.handleError(error); });
    };
    Recipients.prototype.editRecipient = function (recipient) {
        this.isEdit = true;
        this.currentRecipient = recipient;
    };
    Recipients.prototype.selectRecipient = function (recipient) {
        this.isEdit = false;
        this.currentRecipient = recipient;
    };
    Recipients.prototype.selectRecipientIndex = function (i) {
        this.selectedRecipient = i;
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
            template: "\n    <div  *ngIf=\"!currentRecipient\">\n      <button\n        type=\"button\"\n        (click)=\"addRecipient()\"\n        class=\"btn btn-primary\">\n        <span class=\"fa fa-plus\"></span>\n        Add Recipient\n      </button>\n\n      <table class=\"table table-striped\">\n        <thead>\n          <tr>\n            <th></th>\n            <th>Active</th>\n            <th>Recipient name</th>\n            <th>#of donations</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let recipient of recipients; let i=index\"\n            (click)=\"selectRecipient(recipient)\"\n            on-mouseover=\"selectRecipientIndex(i)\"\n            [ngClass]=\"{'info':i===selectedRecipient}\">\n            <td>{{i+1}}</td>\n            <td>\n              <span \n                class=\"fa\" \n                [ngClass]=\"{'fa-check':recipient.isActive,'fa-times':!recipient.isActive}\"\n                [ngStyle]=\"{'color':recipient.isActive ? 'green' : 'red'}\">\n              </span>\n            </td>\n            <td>{{recipient.name}}</td>\n            <td>\n              <span [ngStyle]=\"{'color':recipient.cnt > 0 ? 'black' : 'darkred'}\">\n              {{recipient.cnt}}\n              </span>\n              <span \n                *ngIf=\"recipient.cnt > 0\"\n                class=\"fa fa-plus-square-o\"\n                (click)=\"selectDonations(recipient)\">\n              </span>\n            </td>\n            <td>\n              <button class=\"btn btn-default btn-sm\"\n                (click)=\"editRecipient(recipient)\">\n                <span class=\"fa fa-pencil\"></span> Edit\n              </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <recipient *ngIf=\"currentRecipient\"\n      [recipient]=\"currentRecipient\"\n      [editMode]=\"isNew || isEdit\"\n      [prevNavState]=prevNavState>\n    </recipient>\n  ",
            styles: ["\n  td:hover {cursor:pointer;}\n  tr:nth-child(odd) >td {\n    background-color:#fffae6;\n  }\n  tr:nth-child(even) >td {\n    background-color:snow;\n  }\n  tr:hover >td{\n   background-color:#ccffcc;\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [recipient_service_1.RecipientService, error_service_1.ErrorService, router_1.Router])
    ], Recipients);
    return Recipients;
}());
exports.Recipients = Recipients;
//# sourceMappingURL=recipients.component.js.map