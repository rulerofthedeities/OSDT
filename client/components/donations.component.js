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
var donation_service_1 = require('../services/donation.service');
var recipient_service_1 = require('../services/recipient.service');
var error_service_1 = require('../services/error.service');
var donation_model_1 = require('../models/donation.model');
var Donations = (function () {
    function Donations(donationService, recipientService, errorService, route, router) {
        this.donationService = donationService;
        this.recipientService = recipientService;
        this.errorService = errorService;
        this.route = route;
        this.router = router;
        this.currentDonation = null;
        this.currentRecipient = null;
        this.selectedDonation = null;
        this.isEdit = false;
        this.isNew = false;
    }
    Donations.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.recipientId = params['id'];
            _this.getDonations(_this.recipientId);
            _this.getRecipient(_this.recipientId);
        });
        this.donationService.added.subscribe(function (addedDonation) {
            _this.currentDonation = null;
            _this.donations.push(addedDonation);
        });
        this.donationService.closed.subscribe(function (closedDonation) { _this.currentDonation = null; });
    };
    Donations.prototype.getDonations = function (recipientId) {
        var _this = this;
        this.donationService.getDonations(recipientId)
            .subscribe(function (donations) {
            _this.donations = donations.map(function (donation) { return donation.donation; });
            if (!recipientId) {
                _this.recipientIds = donations.map(function (donation) { return donation.recipient; });
            }
        }, function (error) { return _this.errorService.handleError(error); });
    };
    Donations.prototype.getRecipient = function (recipientId) {
        var _this = this;
        if (recipientId) {
            this.recipientService.getRecipient(recipientId).subscribe(function (recipient) { _this.currentRecipient = recipient; }, function (error) { return _this.errorService.handleError(error); });
        }
    };
    Donations.prototype.selectDonation = function (donation) {
        this.currentDonation = donation;
    };
    Donations.prototype.editDonation = function (donation) {
        this.isEdit = true;
        this.currentDonation = donation;
    };
    Donations.prototype.selectDonationIndex = function (i) {
        this.selectedDonation = i;
    };
    Donations.prototype.addDonation = function () {
        this.isNew = true;
        this.currentDonation = new donation_model_1.Donation('EUR', 10, 'creditcard', new Date(), '');
    };
    Donations.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    Donations = __decorate([
        core_1.Component({
            template: "\n    <div *ngIf=\"!currentDonation\">\n\n      <button \n        type=\"button\"\n        (click)=\"addDonation()\"\n        class=\"btn btn-primary\">\n        <span class=\"fa fa-plus\"></span>\n        Add Donation {{currentRecipient ? ' for ' + currentRecipient.name : ''}}\n      </button>\n\n      <table class=\"table table-striped\">\n        <thead>\n          <tr>\n            <th colspan=\"6\" class=\"text-center\">\n              {{currentRecipient ? 'Donations for ' + currentRecipient.name : 'All donations'}}\n            </th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let donation of donations; let i=index\"\n            (click)=\"selectDonation(donation)\"\n            on-mouseover=\"selectDonationIndex(i)\"\n            [ngClass]=\"{'info':i===selectedDonation}\">\n            <td>{{i+1}}</td>\n            <td>{{recipientId ? '' : recipientIds[i].name}}</td>\n            <td>{{donation.amount}} {{donation.currency}}</td>\n            <td>{{donation.dtPaid|date:'shortDate'}}</td>\n            <td>{{donation.note}}</td>\n            <td>\n              <button class=\"btn btn-default btn-sm\"\n                (click)=\"editDonation(donation)\">\n                <span class=\"fa fa-pencil\"></span> Edit\n              </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <donation *ngIf=\"currentDonation\"\n      [donation]=\"currentDonation\"\n      [recipientId]=\"recipientId || recipientIds[selectedDonation]?.id\"\n      [editMode]=\"isNew || isEdit\">\n    </donation>\n\n    <alert type=\"info\">ng2-bootstrap hello world!</alert>\n  ",
            styles: ["td:hover {cursor:pointer;}"]
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, recipient_service_1.RecipientService, error_service_1.ErrorService, router_1.ActivatedRoute, router_1.Router])
    ], Donations);
    return Donations;
}());
exports.Donations = Donations;
//# sourceMappingURL=donations.component.js.map