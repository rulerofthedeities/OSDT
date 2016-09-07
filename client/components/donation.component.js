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
var forms_1 = require('@angular/forms');
var donation_model_1 = require('../models/donation.model');
var recipient_model_1 = require('../models/recipient.model');
var donation_service_1 = require('../services/donation.service');
var error_service_1 = require('../services/error.service');
var fields_service_1 = require('../services/fields.service');
var EditDonation = (function () {
    function EditDonation(donationService, errorService, fieldsService, formBuilder) {
        this.donationService = donationService;
        this.errorService = errorService;
        this.fieldsService = fieldsService;
        this.formBuilder = formBuilder;
        this.donationFieldsAssoc = {};
    }
    EditDonation.prototype.ngOnInit = function () {
        this.buildForm();
        var fields = this.fieldsService.getFields('donation');
        this.donationFieldsAssoc = fields.assoc;
        this.donationFieldsOrder = fields.ordered;
    };
    EditDonation.prototype.buildForm = function () {
        this.donationForm = this.formBuilder.group({
            'paymentType': [this.donation.paymentType, forms_1.Validators.required],
            'amount': [this.donation.amount, forms_1.Validators.required],
            'note': [this.donation.amount],
            'currency': [this.donation.amount, forms_1.Validators.required]
        });
    };
    EditDonation.prototype.submitForm = function (donation) {
        var _this = this;
        if (this.donation._id) {
            //Update donation
            donation._id = this.donation._id;
            this.donationService.updateDonation(donation)
                .subscribe(function (data) { console.log('Updated donation', data); }, function (error) { return _this.errorService.handleError(error); });
        }
        else {
            //Save donation
            donation.dtPaid = new Date();
            this.donationService.addDonation(donation, this.recipient._id)
                .subscribe(function (data) { console.log('Added donation', data); }, function (error) { return _this.errorService.handleError(error); });
        }
    };
    EditDonation.prototype.toggleEditMode = function () {
        this.editMode = !this.editMode;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', donation_model_1.Donation)
    ], EditDonation.prototype, "donation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', recipient_model_1.Recipient)
    ], EditDonation.prototype, "recipient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EditDonation.prototype, "editMode", void 0);
    EditDonation = __decorate([
        core_1.Component({
            selector: 'donation',
            template: "\n  <button *ngIf=\"!editMode\"\n    class=\"btn btn-primary\" \n    type=\"button\"\n    (click)=\"toggleEditMode()\">\n    Edit Mode\n  </button>\n\n  <form *ngIf=\"editMode\"\n    [formGroup]=\"donationForm\" \n    class=\"form-horizontal\" \n    (submit)=\"submitForm(donationForm.value)\">\n\n    <div class=\"form-group\">\n      <auto-field \n        [field]=\"donationFieldsAssoc['paymentType']\"\n        [data]=\"donation\"\n        [form]=\"donationForm\">\n      </auto-field>\n    </div>\n\n    <div class=\"form-group\">\n      <auto-field \n        [field]=\"donationFieldsAssoc['amount']\"\n        [data]=\"donation\"\n        [form]=\"donationForm\">\n      </auto-field>\n    </div>\n\n    <div class=\"form-group\">\n      <auto-field \n        [field]=\"donationFieldsAssoc['currency']\"\n        [data]=\"donation\"\n        [form]=\"donationForm\">\n      </auto-field>\n    </div>\n\n    <div class=\"form-group\">\n      <auto-field \n        [field]=\"donationFieldsAssoc['note']\"\n        [data]=\"donation\"\n        [form]=\"donationForm\">\n      </auto-field>\n    </div>\n\n    <button \n      type=\"submit\"\n      [disabled]=\"!donationForm.valid\" \n      class=\"btn btn-primary col-xs-offset-2\">\n      {{donation._id ? \"Update donation\" : \"Save donation\"}}\n    </button>\n\n    <button\n      class=\"btn btn-primary\" \n      type=\"button\"\n      (click)=\"toggleEditMode()\">\n      Cancel\n    </button>\n  </form>\n  \n  <div *ngIf=\"!editMode\">\n    <auto-form-read\n      [fields]=\"donationFieldsOrder\"\n      [data]=\"donation\"\n      >\n    </auto-form-read>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, error_service_1.ErrorService, fields_service_1.FieldsService, forms_1.FormBuilder])
    ], EditDonation);
    return EditDonation;
}());
exports.EditDonation = EditDonation;
//# sourceMappingURL=donation.component.js.map