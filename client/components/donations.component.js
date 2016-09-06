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
    }
    Donations.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            var recipientId = params['id'];
            _this.getDonations(recipientId);
            _this.getRecipient(recipientId);
        });
        this.donationService.added.subscribe(function (addedDonation) {
            _this.currentDonation = null;
            _this.donations.push(addedDonation);
        });
    };
    Donations.prototype.getDonations = function (recipientId) {
        var _this = this;
        this.donationService.getDonations(recipientId)
            .subscribe(function (donations) { _this.donations = donations; }, function (error) { return _this.errorService.handleError(error); });
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
    Donations.prototype.addDonation = function () {
        this.currentDonation = new donation_model_1.Donation('EUR', 10, 'creditcard', new Date(), '');
    };
    Donations.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    Donations = __decorate([
        core_1.Component({
            template: "\n    <h3>Donations</h3>\n\n    <div>\n      {{currentRecipient ? 'Donations for ' + currentRecipient.name : 'All donations'}}\n    </div>\n\n    <button *ngIf=\"currentRecipient && !currentDonation\" \n      type=\"button\"\n      (click)=\"addDonation()\"\n      class=\"btn btn-primary\">\n      Add Donation\n    </button>\n\n    <donation *ngIf=\"currentDonation\"\n      [donation]=\"currentDonation\"\n      [recipient]=\"currentRecipient\"\n      editMode=false>\n    </donation>\n\n    <ul *ngIf=\"!currentDonation\">\n      <li *ngFor=\"let donation of donations\"\n        (click)=\"selectDonation(donation)\"> \n        {{donation.note}}\n        <!-- <pre>{{donation|json}}</pre> -->\n      </li>\n    </ul>\n\n    <alert type=\"info\">ng2-bootstrap hello world!</alert>\n  "
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, recipient_service_1.RecipientService, error_service_1.ErrorService, router_1.ActivatedRoute, router_1.Router])
    ], Donations);
    return Donations;
}());
exports.Donations = Donations;
//# sourceMappingURL=donations.component.js.map