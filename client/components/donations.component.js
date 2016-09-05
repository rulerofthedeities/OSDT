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
var Donations = (function () {
    function Donations(donationService, errorService) {
        this.donationService = donationService;
        this.errorService = errorService;
        this.currentDonation = null;
    }
    Donations.prototype.ngOnInit = function () {
        this.getDonations();
    };
    Donations.prototype.getDonations = function () {
        var _this = this;
        this.donationService.getDonations()
            .subscribe(function (donations) { _this.donations = donations; }, function (error) { return _this.errorService.handleError(error); });
    };
    Donations.prototype.selectDonation = function (donation) {
        this.currentDonation = donation;
    };
    Donations = __decorate([
        core_1.Component({
            template: "\n    <div>Donations</div>\n\n    <ul>\n      <li *ngFor=\"let donation of donations\"\n        (click)=\"selectDonation(donation?.donation)\"> \n        {{donation?.donation?.note}}\n        <!-- <pre>{{donation|json}}</pre> -->\n      </li>\n    </ul>\n\n    <donation *ngIf=\"currentDonation\"\n      [donation]=\"currentDonation\"\n      editMode=false>\n    </donation>\n\n    <alert type=\"info\">ng2-bootstrap hello world!</alert>\n  "
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, error_service_1.ErrorService])
    ], Donations);
    return Donations;
}());
exports.Donations = Donations;
//# sourceMappingURL=donations.component.js.map