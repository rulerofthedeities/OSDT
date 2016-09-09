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
var donation_service_1 = require('../services/donation.service');
var error_service_1 = require('../services/error.service');
var EmbeddedDonations = (function () {
    function EmbeddedDonations(donationService, errorService) {
        this.donationService = donationService;
        this.errorService = errorService;
        this.currentDonation = null;
        this.selectedDonation = null;
        this.isEdit = false;
    }
    EmbeddedDonations.prototype.ngOnInit = function () {
        this.getDonations(this.recipientId);
    };
    EmbeddedDonations.prototype.getDonations = function (recipientId) {
        var _this = this;
        this.donationService.getDonations(recipientId)
            .subscribe(function (donations) { _this.donations = donations.map(function (donation) { return donation.donation; }); }, function (error) { return _this.errorService.handleError(error); });
    };
    EmbeddedDonations.prototype.selectDonation = function (donation) {
        this.currentDonation = donation;
    };
    EmbeddedDonations.prototype.editDonation = function (donation) {
        this.isEdit = true;
        this.currentDonation = donation;
    };
    EmbeddedDonations.prototype.selectDonationIndex = function (i) {
        this.selectedDonation = i;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmbeddedDonations.prototype, "recipientId", void 0);
    EmbeddedDonations = __decorate([
        core_1.Component({
            selector: 'donations',
            template: "\n    <table class=\"table table-striped small\">\n      <tbody>\n        <tr *ngFor=\"let donation of donations; let i=index\"\n          (click)=\"selectDonation(donation)\"\n          on-mouseover=\"selectDonationIndex(i)\"\n          [ngClass]=\"{'info':i===selectedDonation}\">\n          <td>{{i+1}}</td>\n          <td>{{recipientId ? '' : recipientIds[i].name}}</td>\n          <td>{{donation.amount}} {{donation.currency}}</td>\n          <td>{{donation.dtPaid|date:'shortDate'}}</td>\n          <td>{{donation.note}}</td>\n          <td>\n            <button class=\"btn btn-default btn-sm\"\n              (click)=\"editDonation(donation)\">\n              <span class=\"fa fa-pencil\"></span> Edit\n            </button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  "
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, error_service_1.ErrorService])
    ], EmbeddedDonations);
    return EmbeddedDonations;
}());
exports.EmbeddedDonations = EmbeddedDonations;
//# sourceMappingURL=donations-embedded.component.js.map