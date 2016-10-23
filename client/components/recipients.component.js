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
var auth_service_1 = require('../services/auth.service');
var error_service_1 = require('../services/error.service');
var recipient_model_1 = require('../models/recipient.model');
var Recipients = (function () {
    function Recipients(recipientService, errorService, authService, route, router) {
        this.recipientService = recipientService;
        this.errorService = errorService;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.recipients = [];
        this.currentRecipient = null;
        this.selectedRecipient = null;
        this.activeRecipient = null; // defines view buttons
        this.selectedDonations = null;
        this.isEdit = false;
        this.isNew = false;
        this.prevNavState = 'viewRecipient'; //view if closing/canceling must lead back to view
        this.mayCreateRecipient = false;
        this.mayCreateDonation = false;
    }
    Recipients.prototype.ngOnInit = function () {
        var _this = this;
        this.getRoles();
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
        this.recipientService.getRecipients(false).subscribe(function (recipients) {
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
    Recipients.prototype.setActiveRecipientIndex = function (i) {
        this.activeRecipient = i;
    };
    Recipients.prototype.toggleActive = function () {
        var _this = this;
        if (this.activeRecipient !== null) {
            var recipient_1 = this.recipients[this.activeRecipient];
            var newActiveState = !recipient_1.isActive;
            recipient_1.isActive = newActiveState;
            this.recipientService.setActiveState(recipient_1._id, newActiveState).subscribe(function (active) { recipient_1.isActive = active; }, function (error) { return _this.errorService.handleError(error); });
        }
    };
    Recipients.prototype.addRecipient = function () {
        this.isNew = true;
        this.currentRecipient = new recipient_model_1.Recipient('demoUser', '', '', [], '', true);
    };
    Recipients.prototype.toggleDonations = function (event, i) {
        if (event) {
            event.stopPropagation();
        }
        this.selectedDonations = this.selectedDonations === i ? null : i;
    };
    Recipients.prototype.addDonation = function () {
        if (this.activeRecipient !== null) {
            this.router.navigate(['/donations'], { queryParams: { new: this.recipients[this.activeRecipient]._id } });
        }
    };
    Recipients.prototype.setInitialDonations = function (recipientId) {
        var _this = this;
        var i = 0;
        this.recipients.forEach(function (recipient) {
            if (recipientId === recipient._id && recipient.cnt > 0) {
                _this.toggleDonations(null, i);
            }
            ;
            i++;
        });
    };
    Recipients.prototype.getRoles = function () {
        if (!this.authService.getUserAccess()) {
            this.authService.setUserAccess(this.route.snapshot.data['access']);
        }
        this.mayCreateRecipient = this.authService.hasRole('CreateRecipient');
        this.mayCreateDonation = this.authService.hasRole('CreateDonation');
    };
    Recipients.prototype.ngOnDestroy = function () {
        if (this.paramSubscription) {
            this.paramSubscription.unsubscribe();
        }
    };
    Recipients = __decorate([
        core_1.Component({
            template: "\n  <section>\n    <div *ngIf=\"!currentRecipient\">\n      <alert type=\"info\">\n        <button\n          type=\"button\"\n          *ngIf=\"mayCreateRecipient\"\n          (click)=\"addRecipient()\"\n          class=\"btn btn-primary\">\n          <span class=\"fa fa-plus\"></span>\n          Add Recipient\n        </button>\n\n        <button *ngIf=\"activeRecipient !== null\"\n          type=\"button\"\n          (click)=\"editRecipient(recipients[activeRecipient])\"\n          class=\"btn btn-primary\">\n          <span class=\"fa fa-pencil\"></span>\n          Edit Recipient\n        </button>\n\n        <button *ngIf=\"activeRecipient !== null\"\n          type=\"button\"\n          (click)=\"toggleActive()\"\n          class=\"btn btn-primary\">\n          <span class=\"fa\"\n            [ngClass]=\"{'fa-check':!recipients[activeRecipient].isActive,'fa-times':recipients[activeRecipient].isActive}\"\n            [ngStyle]=\"{'color':!recipients[activeRecipient].isActive ? 'green' : 'red'}\">\n          </span>\n          {{recipients[activeRecipient].isActive ? 'Set Inactive' : 'Set Active'}}\n        </button>\n\n        <button *ngIf=\"mayCreateDonation && activeRecipient !== null && recipients[activeRecipient].isActive\"\n          type=\"button\"\n          (click)=\"addDonation()\"\n          class=\"btn btn-primary\">\n          <span class=\"fa fa-plus\"></span>\n          Add Donation\n        </button>\n\n      </alert>\n\n      <table class=\"table table-striped\">\n        <thead>\n          <tr>\n            <th></th>\n            <th>Active</th>\n            <th>Recipient name</th>\n            <th>#of donations</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n          <template ngFor [ngForOf]=\"recipients\" let-recipient let-i=\"index\">\n            <tr class=\"recipients\"\n              on-mouseover=\"selectRecipientIndex(i)\"\n              [ngClass]=\"{'info':i===selectedRecipient,'active':i===activeRecipient}\"\n              (click)=\"i===activeRecipient ? selectRecipient(recipient) : setActiveRecipientIndex(i)\">\n              <td>{{i+1}}</td>\n              <td>\n                <span \n                  class=\"fa\" \n                  [ngClass]=\"{'fa-check':recipient.isActive,'fa-times':!recipient.isActive}\"\n                  [ngStyle]=\"{'color':recipient.isActive ? 'green' : 'red'}\">\n                </span>\n              </td>\n              <td>\n                {{recipient.name}}\n              </td>\n              <td>\n                <span (click)=\"toggleDonations($event, i)\" class=\"hover\">\n                  <span [ngStyle]=\"{'color':recipient.cnt > 0 ? 'black' : 'darkred'}\">\n                  {{recipient.cnt}}\n                  </span>\n                  <span \n                    *ngIf=\"recipient.cnt > 0\"\n                    class=\"fa\"\n                    [ngClass]=\"{\n                      'fa-plus-square-o':selectedDonations!==i,\n                      'fa-minus-square-o':selectedDonations===i\n                    }\">\n                  </span>\n                </span>\n              </td>\n              <td>\n                <button class=\"btn btn-default btn-sm\"\n                  (click)=\"editRecipient(recipient)\">\n                  <span class=\"fa fa-pencil\"></span> Edit\n                </button>\n              </td>\n            </tr>\n            <tr *ngIf=\"selectedDonations===i\" class=\"donations\">\n              <td colspan=\"2\"></td>\n              <td colspan=\"3\">\n                <donations\n                  [isSubview]=\"true\"\n                  [recipientId]=\"recipients[selectedDonations]._id\">\n                </donations>\n              </td>\n            </tr>\n          </template>\n        </tbody>\n      </table>\n    </div>\n\n    <recipient *ngIf=\"currentRecipient\"\n      [recipient]=\"currentRecipient\"\n      [editMode]=\"isNew || isEdit\"\n      [prevNavState]=prevNavState>\n    </recipient>\n\n  </section>\n  ",
            styles: ["\n  tr {\n    cursor:default;\n  }\n  .hover:hover {cursor:pointer;}\n  tr:nth-child(odd) >td {\n    background-color:#fffae6;\n  }\n  tr:nth-child(even) >td {\n    background-color:snow;\n  }\n  tr.recipients:hover >td {\n    background-color:#ccffcc;\n  }\n  tr.recipients.active {\n    outline: thin solid green;\n    cursor: pointer;\n  }\n  .fa{font-size:1.2em}\n  "]
        }), 
        __metadata('design:paramtypes', [recipient_service_1.RecipientService, error_service_1.ErrorService, auth_service_1.AuthService, router_1.ActivatedRoute, router_1.Router])
    ], Recipients);
    return Recipients;
}());
exports.Recipients = Recipients;
