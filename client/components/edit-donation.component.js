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
var field_control_service_1 = require('../services/field-control.service');
var fields_service_1 = require('../services/fields.service');
var EditDonation = (function () {
    function EditDonation(donationService, errorService, fieldControlService, fieldsService) {
        this.donationService = donationService;
        this.errorService = errorService;
        this.fieldControlService = fieldControlService;
        this.fieldsService = fieldsService;
    }
    EditDonation.prototype.ngOnInit = function () {
        var _this = this;
        this.fields = this.fieldsService.getDonationFields();
        this.fieldControlService.dataSubmitted.subscribe(function (formData) { _this.submitForm(formData); });
    };
    EditDonation.prototype.submitForm = function (donation) {
        var _this = this;
        donation.dtPaid = new Date();
        donation.recipientId = '57bb3aa95b315169c0c5cb49';
        this.donationService.addDonation(donation)
            .subscribe(function (data) { console.log('added donation', data); }, function (error) { return _this.errorService.handleError(error); });
    };
    EditDonation = __decorate([
        core_1.Component({
            selector: 'donation',
            template: "\n  NEW DONATION\n  <auto-form [fields]=\"fields\">\n  </auto-form>\n  "
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, error_service_1.ErrorService, field_control_service_1.FieldControlService, fields_service_1.FieldsService])
    ], EditDonation);
    return EditDonation;
}());
exports.EditDonation = EditDonation;
//# sourceMappingURL=edit-donation.component.js.map