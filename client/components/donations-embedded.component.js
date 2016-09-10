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
var error_service_1 = require('../services/error.service');
var EmbeddedDonations = (function () {
    function EmbeddedDonations(donationService, errorService, router) {
        this.donationService = donationService;
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
            .subscribe(function (donations) { _this.donations = donations.map(function (donation) { return donation.donation; }); }, function (error) { return _this.errorService.handleError(error); });
    };
    EmbeddedDonations.prototype.selectDonationIndex = function (i) {
        this.selectedDonation = i;
    };
    EmbeddedDonations.prototype.openDonation = function (donation, editMode) {
        this.router.navigate(['/donations', donation._id], { queryParams: { 'edit': editMode ? 1 : 0 } });
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
            template: "\n    <div *ngIf=\"!currentDonation\">\n      <table class=\"table table-striped\" [ngClass]=\"{'small': isSubview}\">\n        <tbody>\n          <tr *ngFor=\"let donation of donations; let i=index\"\n            on-mouseover=\"selectDonationIndex(i)\"\n            [ngClass]=\"{'info':i===selectedDonation}\">\n            <td>{{i+1}}</td>\n            <td class=\"hover\" (click)=\"openDonation(donation, false)\">\n              {{recipientIds ? recipientIds[i].name : ''}}\n            </td>\n            <td class=\"hover\" (click)=\"openDonation(donation, false)\">\n              {{donation.amount}} {{donation.currency}}\n            </td>\n            <td class=\"hover\" (click)=\"openDonation(donation, false)\">\n              {{donation.dtPaid|date:'shortDate'}}\n            </td>\n            <td class=\"hover\" (click)=\"openDonation(donation, false)\">\n              {{donation.note}}\n            </td>\n            <td>\n              <button class=\"btn btn-default btn-sm\"\n                (click)=\"openDonation(donation, true)\">\n                <span class=\"fa fa-pencil\"></span> Edit\n              </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  ",
            styles: ["\n    .hover:hover {cursor:pointer;}\n    tr:nth-child(odd) >td {\n      background-color:#eff5f5;\n    }\n    tr:nth-child(even) >td {\n      background-color:#fdfdff;\n    }\n    tr:hover >td{\n     background-color:#ccffcc;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, error_service_1.ErrorService, router_1.Router])
    ], EmbeddedDonations);
    return EmbeddedDonations;
}());
exports.EmbeddedDonations = EmbeddedDonations;
//# sourceMappingURL=donations-embedded.component.js.map