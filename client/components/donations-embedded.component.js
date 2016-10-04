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
var auth_service_1 = require('../services/auth.service');
var error_service_1 = require('../services/error.service');
var EmbeddedDonations = (function () {
    function EmbeddedDonations(donationService, currencyService, authService, errorService, router) {
        this.donationService = donationService;
        this.currencyService = currencyService;
        this.authService = authService;
        this.errorService = errorService;
        this.router = router;
        this.recipientId = '';
        this.isSubview = false;
        this.addNewDonation = new core_1.EventEmitter();
        this.currentDonation = null;
        this.selectedDonation = null;
        this.activeDonation = null;
        this.isEdit = false;
    }
    EmbeddedDonations.prototype.ngOnInit = function () {
        var _this = this;
        if (this.authService.isLoggedIn()) {
            this.getDonations(this.recipientId);
            this.donationService.closeToView.subscribe(function (closedDonation) {
                if (closedDonation) {
                    _this.getDonations('');
                }
                _this.currentDonation = null;
            });
        }
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
    EmbeddedDonations.prototype.setActiveDonationIndex = function (i) {
        this.activeDonation = i;
    };
    EmbeddedDonations.prototype.addDonation = function () {
        this.addNewDonation.emit(null);
    };
    EmbeddedDonations.prototype.copyDonation = function (donation) {
        this.addNewDonation.emit(donation);
    };
    EmbeddedDonations.prototype.confirmDeletion = function (confirm) {
        confirm.showModal = true;
    };
    EmbeddedDonations.prototype.onDeletionConfirmed = function (deleteOk) {
        if (deleteOk) {
            this.deleteDonation(this.activeDonation);
        }
    };
    EmbeddedDonations.prototype.deleteDonation = function (donationIndex) {
        var _this = this;
        this.donationService.removeDonation(this.donations[donationIndex]._id, this.recipients[donationIndex]._id).subscribe(function (data) { ; }, function (error) { return _this.errorService.handleError(error); });
        this.donations.splice(donationIndex, 1);
    };
    EmbeddedDonations.prototype.openDonation = function (event, donation, editMode) {
        if (event) {
            event.stopPropagation();
        }
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
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EmbeddedDonations.prototype, "addNewDonation", void 0);
    EmbeddedDonations = __decorate([
        core_1.Component({
            selector: 'donations',
            template: "\n    <div *ngIf=\"!currentDonation\">\n\n      <alert type=\"info\" *ngIf=\"!recipientId\">\n        <button \n          type=\"button\"\n          (click)=\"addDonation()\"\n          class=\"btn btn-primary\">\n          <span class=\"fa fa-plus\"></span>\n          Add Donation\n        </button>\n\n        <button *ngIf=\"activeDonation !== null\"\n          type=\"button\"\n          (click)=\"openDonation(null, donations[activeDonation], true)\"\n          class=\"btn btn-primary\">\n          <span class=\"fa fa-pencil\"></span>\n          Edit\n        </button>\n\n        <button *ngIf=\"activeDonation !== null\"\n          type=\"button\"\n          (click)=\"copyDonation(donations[activeDonation])\"\n          class=\"btn btn-primary\">\n          <span class=\"fa fa-files-o\"></span>\n          Copy\n        </button>\n\n        <button *ngIf=\"activeDonation !== null\"\n          type=\"button\"\n          (click)=\"confirmDeletion(confirm)\"\n          class=\"btn btn-danger\">\n          <span class=\"fa fa-trash-o\"></span>\n          Delete\n        </button>\n\n      </alert>\n\n\n      <table class=\"table table-striped\" [ngClass]=\"{'small': isSubview}\">\n        <thead *ngIf=\"!isSubview\">\n          <tr>\n            <th></th>\n            <th>Amount</th>\n            <th>Date</th>\n            <th>Recipient</th>\n            <th>Note</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let donation of donations; let i=index\"\n            on-mouseover=\"selectDonationIndex(i)\"\n            (click)=\"i===activeDonation || recipientId ? openDonation($event, donation, false) : setActiveDonationIndex(i)\"\n            [ngClass]=\"{'info':i===selectedDonation,'active':i===activeDonation && !recipientId, hover:i===activeDonation || recipientId}\">\n            <td>{{i+1}}</td>\n            <td>\n              {{donation.amount}} {{donation.currency}}\n            </td>\n            <td>\n              {{donation.dtPaid|date:'shortDate'}}\n            </td>\n            <td *ngIf=\"!isSubview\">\n              {{recipients[i].name}}\n            </td>\n            <td>\n              {{donation.note}}\n            </td>\n            <td>\n              <button class=\"btn btn-default btn-sm\"\n                (click)=\"openDonation($event, donation, true)\">\n                <span class=\"fa fa-pencil\"></span> Edit\n              </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <modal-confirm #confirm\n      (confirmed)=\"onDeletionConfirmed($event)\">\n      <div title>Warning</div>\n      <div message>Are you sure you want to delete the selected donation?</div>\n    </modal-confirm>\n  ",
            styles: ["\n    tr {\n      cursor:default;\n    }\n    .hover:hover {cursor:pointer;}\n    tr:nth-child(odd) >td {\n      background-color:#eff5f5;\n    }\n    tr:nth-child(even) >td {\n      background-color:#fdfdff;\n    }\n    tr:hover >td{\n     background-color:#ccffcc;\n    }\n    tr.active {\n      outline: thin solid green;\n      cursor: pointer;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, currency_service_1.CurrencyService, auth_service_1.AuthService, error_service_1.ErrorService, router_1.Router])
    ], EmbeddedDonations);
    return EmbeddedDonations;
}());
exports.EmbeddedDonations = EmbeddedDonations;
//# sourceMappingURL=donations-embedded.component.js.map