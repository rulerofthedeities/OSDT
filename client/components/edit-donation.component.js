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
var donation_model_1 = require('../models/donation.model');
var donation_service_1 = require('../services/donation.service');
var error_service_1 = require('../services/error.service');
var fields_service_1 = require('../services/fields.service');
var EditDonation = (function () {
    function EditDonation(donationService, errorService, fieldsService) {
        this.donationService = donationService;
        this.errorService = errorService;
        this.fieldsService = fieldsService;
    }
    EditDonation.prototype.ngOnInit = function () {
        this.fields = this.fieldsService.getDonationFields();
    };
    EditDonation.prototype.onSubmit = function () {
        var _this = this;
        console.log('test adding donation');
        var donation = new donation_model_1.Donation('EUR', 20, 'credit card', new Date(), 'test2', '57bb3aa95b315169c0c5cb49');
        this.donationService.addDonation(donation)
            .subscribe(function (data) { console.log('added donation', data); }, function (error) { return _this.errorService.handleError(error); });
    };
    EditDonation = __decorate([
        core_1.Component({
            selector: 'donation',
            template: "\n  NEW DONATION\n  <auto-form [fields]=\"fields\">\n  </auto-form>\n  "
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, error_service_1.ErrorService, fields_service_1.FieldsService])
    ], EditDonation);
    return EditDonation;
}());
exports.EditDonation = EditDonation;
//# sourceMappingURL=edit-donation.component.js.map