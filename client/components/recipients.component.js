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
    function Recipients(recipientService, errorService, route) {
        this.recipientService = recipientService;
        this.errorService = errorService;
        this.route = route;
        this.recipients = [];
        this.currentRecipient = null;
        this.selectedRecipient = null;
        this.selectedDonations = null;
        this.isEdit = false;
        this.isNew = false;
        this.prevNavState = 'viewRecipient'; //view if closing/canceling must lead back to view
    }
    Recipients.prototype.ngOnInit = function () {
        var _this = this;
        this.getRecipients();
        this.recipientService.closeToView.subscribe(function (closedRecipient) {
            if (closedRecipient) {
                _this.getRecipients();
            }
            _this.currentRecipient = null;
        });
    };
    Recipients.prototype.getRecipients = function () {
        var _this = this;
        this.recipientService.getRecipients(false)
            .subscribe(function (recipients) {
            _this.recipients = recipients;
            _this.paramSubscription = _this.route.params.subscribe(function (params) {
                if (params['id']) {
                    _this.setInitialDonations(params['id']);
                }
            });
        }, function (error) { return _this.errorService.handleError(error); });
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
    Recipients.prototype.toggleDonations = function (i) {
        this.selectedDonations = this.selectedDonations === i ? null : i;
    };
    Recipients.prototype.setInitialDonations = function (recipientId) {
        var _this = this;
        var i = 0;
        this.recipients.forEach(function (recipient) {
            if (recipientId === recipient._id && recipient.cnt > 0) {
                _this.toggleDonations(i);
            }
            ;
            i++;
        });
    };
    Recipients.prototype.ngOnDestroy = function () {
        if (this.paramSubscription) {
            this.paramSubscription.unsubscribe();
        }
    };
    Recipients = __decorate([
        core_1.Component({
            template: "\n    <div *ngIf=\"!currentRecipient\">\n      <alert type=\"info\">\n        <button\n          type=\"button\"\n          (click)=\"addRecipient()\"\n          class=\"btn btn-primary\">\n          <span class=\"fa fa-plus\"></span>\n          Add Recipient\n        </button>\n      </alert>\n\n      <table class=\"table table-striped\">\n        <thead>\n          <tr>\n            <th></th>\n            <th>Active</th>\n            <th>Recipient name</th>\n            <th>#of donations</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n          <template ngFor [ngForOf]=\"recipients\" let-recipient let-i=\"index\">\n            <tr class=\"recipients\"\n              on-mouseover=\"selectRecipientIndex(i)\"\n              [ngClass]=\"{'info':i===selectedRecipient}\">\n              <td>{{i+1}}</td>\n              <td>\n                <span \n                  class=\"fa\" \n                  [ngClass]=\"{'fa-check':recipient.isActive,'fa-times':!recipient.isActive}\"\n                  [ngStyle]=\"{'color':recipient.isActive ? 'green' : 'red'}\">\n                </span>\n              </td>\n              <td class=\"hover\" (click)=\"selectRecipient(recipient)\">\n                {{recipient.name}}\n              </td>\n              <td>\n                <span (click)=\"toggleDonations(i)\" class=\"hover\">\n                  <span [ngStyle]=\"{'color':recipient.cnt > 0 ? 'black' : 'darkred'}\">\n                  {{recipient.cnt}}\n                  </span>\n                  <span \n                    *ngIf=\"recipient.cnt > 0\"\n                    class=\"fa\"\n                    [ngClass]=\"{\n                      'fa-plus-square-o':selectedDonations!==i,\n                      'fa-minus-square-o':selectedDonations===i\n                    }\">\n                  </span>\n                </span>\n              </td>\n              <td>\n                <button class=\"btn btn-default btn-sm\"\n                  (click)=\"editRecipient(recipient)\">\n                  <span class=\"fa fa-pencil\"></span> Edit\n                </button>\n              </td>\n            </tr>\n            <tr *ngIf=\"selectedDonations===i\" class=\"donations\">\n              <td colspan=\"2\"></td>\n              <td colspan=\"3\">\n                <donations\n                  [isSubview]=\"true\"\n                  [recipientId]=\"recipients[selectedDonations]._id\">\n                </donations>\n              </td>\n            </tr>\n          </template>\n        </tbody>\n      </table>\n    </div>\n\n    <recipient *ngIf=\"currentRecipient\"\n      [recipient]=\"currentRecipient\"\n      [editMode]=\"isNew || isEdit\"\n      [prevNavState]=prevNavState>\n    </recipient>\n  ",
            styles: ["\n  .hover:hover {cursor:pointer;}\n  tr:nth-child(odd) >td {\n    background-color:#fffae6;\n  }\n  tr:nth-child(even) >td {\n    background-color:snow;\n  }\n  tr.recipients:hover >td{\n   background-color:#ccffcc;\n  }\n  .fa{font-size:1.2em}\n  "]
        }), 
        __metadata('design:paramtypes', [recipient_service_1.RecipientService, error_service_1.ErrorService, router_1.ActivatedRoute])
    ], Recipients);
    return Recipients;
}());
exports.Recipients = Recipients;
//# sourceMappingURL=recipients.component.js.map