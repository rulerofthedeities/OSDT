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
var currency_service_1 = require('../services/currency.service');
var error_service_1 = require('../services/error.service');
var EmbeddedDonations = (function () {
    function EmbeddedDonations(donationService, currencyService, errorService, router) {
        this.donationService = donationService;
        this.currencyService = currencyService;
        this.errorService = errorService;
        this.router = router;
        this.recipientId = '';
        this.isSubview = false;
        this.currentDonation = null;
        this.selectedDonation = null;
        this.isEdit = false;
    }
    EmbeddedDonations.prototype.ngOnInit = function () {
        var _this = this;
        this.getDonations(this.recipientId);
        this.donationService.closeToView.subscribe(function (closedDonation) {
            if (closedDonation) {
                _this.getDonations('');
            }
            _this.currentDonation = null;
        });
    };
    EmbeddedDonations.prototype.getDonations = function (recipientId) {
        var _this = this;
        this.donationService.getDonations(recipientId)
            .subscribe(function (donations) {
            _this.donations = donations.map(function (donation) { return donation.donation; });
            _this.recipients = donations.map(function (donation) { return donation.recipient; });
        }, function (error) { return _this.errorService.handleError(error); });
    };
    EmbeddedDonations.prototype.selectDonationIndex = function (i) {
        this.selectedDonation = i;
    };
    EmbeddedDonations.prototype.openDonation = function (donation, editMode) {
        var params = {};
        if (editMode) {
            params['edit'] = 1;
        }
        if (this.isSubview) {
            params['sub'] = 1;
        }
        this.router.navigate(['/donations', donation._id], { queryParams: params });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmbeddedDonations.prototype, "recipientId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EmbeddedDonations.prototype, "isSubview", void 0);
    EmbeddedDonations = __decorate([
        core_1.Component({
            selector: 'donations',
            template: "\n    <div *ngIf=\"!currentDonation\">\n      <table class=\"table table-striped\" [ngClass]=\"{'small': isSubview}\">\n        <thead *ngIf=\"!isSubview\">\n          <tr>\n            <th></th>\n            <th>Amount</th>\n            <th>Date</th>\n            <th>Recipient</th>\n            <th>Note</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let donation of donations; let i=index\"\n            on-mouseover=\"selectDonationIndex(i)\"\n            [ngClass]=\"{'info':i===selectedDonation}\">\n            <td>{{i+1}}</td>\n            <td *ngIf=\"isSubview\" class=\"hover\" (click)=\"openDonation(donation, false)\">\n              {{recipientIds ? recipientIds[i].name : ''}}\n            </td>\n            <td class=\"hover\" (click)=\"openDonation(donation, false)\">\n              {{donation.amount}} {{donation.currency}}\n            </td>\n            <td class=\"hover\" (click)=\"openDonation(donation, false)\">\n              {{donation.dtPaid|date:'shortDate'}}\n            </td>\n            <td class=\"hover\" (click)=\"openDonation(donation, false)\">\n              {{recipients[i].name}}\n            </td>\n            <td class=\"hover\" (click)=\"openDonation(donation, false)\">\n              {{donation.note}}\n            </td>\n            <td>\n              <button class=\"btn btn-default btn-sm\"\n                (click)=\"openDonation(donation, true)\">\n                <span class=\"fa fa-pencil\"></span> Edit\n              </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  ",
            styles: ["\n    .hover:hover {cursor:pointer;}\n    tr:nth-child(odd) >td {\n      background-color:#eff5f5;\n    }\n    tr:nth-child(even) >td {\n      background-color:#fdfdff;\n    }\n    tr:hover >td{\n     background-color:#ccffcc;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, currency_service_1.CurrencyService, error_service_1.ErrorService, router_1.Router])
    ], EmbeddedDonations);
    return EmbeddedDonations;
}());
exports.EmbeddedDonations = EmbeddedDonations;
//# sourceMappingURL=donations-embedded.component.js.map