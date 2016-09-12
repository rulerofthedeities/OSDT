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
var donation_service_1 = require('../services/donation.service');
var recipient_service_1 = require('../services/recipient.service');
var error_service_1 = require('../services/error.service');
var fields_service_1 = require('../services/fields.service');
var EditDonation = (function () {
    function EditDonation(donationService, recipientService, errorService, fieldsService, formBuilder) {
        this.donationService = donationService;
        this.recipientService = recipientService;
        this.errorService = errorService;
        this.fieldsService = fieldsService;
        this.formBuilder = formBuilder;
        this.donationFieldsAssoc = {};
        this.isNew = false;
    }
    EditDonation.prototype.ngOnInit = function () {
        var _this = this;
        this.donationService.closeToDoc.subscribe(function (closedDonation) {
            _this.donation = closedDonation ? closedDonation : _this.donation;
            _this.toggleEditMode();
        });
        if (!this.recipientId) {
            this.isNew = this.editMode;
        }
        else {
            //get current recipient data
            this.getRecipient(this.recipientId);
            this.isNew = !this.donation._id;
        }
        this.buildForm();
        var fields = this.fieldsService.getFields('donation');
        this.donationFieldsAssoc = fields.assoc;
        this.donationFieldsOrder = fields.ordered;
    };
    EditDonation.prototype.buildForm = function () {
        this.donationForm = this.formBuilder.group({
            'paymentType': [this.donation.paymentType, forms_1.Validators.required],
            'amount': [this.donation.amount, forms_1.Validators.required],
            'note': [this.donation.note],
            'currency': [this.donation.currency, forms_1.Validators.required],
            'dtPaid': [this.donation.dtPaid, forms_1.Validators.required]
        });
    };
    EditDonation.prototype.getRecipient = function (recipientId) {
        var _this = this;
        this.recipientService.getRecipient(recipientId).subscribe(function (recipient) { _this.currentRecipient = recipient; }, function (error) { return _this.errorService.handleError(error); });
    };
    EditDonation.prototype.submitForm = function (donation, target) {
        var _this = this;
        if (this.donation._id) {
            //Update donation
            donation._id = this.donation._id;
            this.donationService.updateDonation(donation)
                .subscribe(function (donation) { _this.donationService.closeDonation(target, donation); }, function (error) { return _this.errorService.handleError(error); });
        }
        else {
            //Add donation
            donation.dtPaid = new Date();
            this.donationService.addDonation(donation, this.recipientId)
                .subscribe(function (donation) { _this.donationService.closeDonation(target, donation); }, function (error) { return _this.errorService.handleError(error); });
        }
    };
    EditDonation.prototype.toggleEditMode = function () {
        this.editMode = !this.editMode;
        this.prevNavState = this.editMode ? 'doc' : 'view';
    };
    EditDonation.prototype.close = function () {
        this.donationService.closeDonation(this.prevNavState);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', donation_model_1.Donation)
    ], EditDonation.prototype, "donation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EditDonation.prototype, "recipientId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EditDonation.prototype, "editMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EditDonation.prototype, "prevNavState", void 0);
    EditDonation = __decorate([
        core_1.Component({
            selector: 'donation',
            template: "\n    <alert type=\"info\">\n      <button *ngIf=\"!editMode\"\n        class=\"btn btn-primary\" \n        type=\"button\"\n        (click)=\"toggleEditMode()\">\n        <span class=\"fa fa-pencil\"></span>\n        Edit Mode\n      </button>\n    </alert>\n\n    <!-- Donation Form -->\n\n    <h3 class=\"col-xs-offset-2\">\n      {{isNew ? \"New donation\" : \"Donation\"}} for {{currentRecipient?.name}}\n    </h3>\n    \n    <div class=\"doc\" *ngIf=\"editMode && currentRecipient\">\n      <form \n        [formGroup]=\"donationForm\" \n        class=\"form-horizontal\">\n\n        <div class=\"form-group\">\n          <auto-field \n            [field]=\"donationFieldsAssoc['paymentType']\"\n            [data]=\"donation\"\n            [form]=\"donationForm\">\n          </auto-field>\n        </div>\n\n        <div class=\"form-group\">\n          <label \n            for=\"amount\"\n            class=\"control-label col-xs-2\">\n            {{donationFieldsAssoc['amount'].label}}\n          </label>\n          <div class=\"col-xs-5\">\n            <input \n              class=\"form-control\"\n              [placeholder]=\"donationFieldsAssoc['amount'].placeholder\"\n              formControlName=\"amount\"\n              [id]=\"amount\"\n              type=\"number\">\n          </div>\n          <div class=\"col-xs-5\">\n            <select \n              class=\"form-control\"\n              formControlName=\"currency\">\n              <option \n                *ngFor=\"let opt of donationFieldsAssoc['currency'].options\" \n                [value]=\"opt.key\">\n                {{opt.display}}\n              </option>\n            </select>\n          </div>\n           <div class=\"col-xs-offset-2\">\n            <field-messages \n              [control]=\"donationForm.controls.amount\"\n              [label]=\"donationFieldsAssoc['amount'].label\">\n            </field-messages>\n          </div>\n        </div>\n\n\n        <div class=\"form-group\">\n          <auto-field \n            [field]=\"donationFieldsAssoc['note']\"\n            [data]=\"donation\"\n            [form]=\"donationForm\">\n          </auto-field>\n        </div>\n\n        <button \n          type=\"submit\"\n          (click)=\"submitForm(donationForm.value, 'doc')\"\n          [disabled]=\"!donationForm.valid\" \n          class=\"btn btn-success col-xs-offset-2\">\n          <span class=\"fa fa-check\"></span>\n          Save\n        </button>\n\n        <button \n          type=\"submit\"\n          (click)=\"submitForm(donationForm.value, 'view')\"\n          [disabled]=\"!donationForm.valid\" \n          class=\"btn btn-success\">\n          <span class=\"fa fa-check\"></span>\n          Save & Close\n        </button>\n\n        <button\n          class=\"btn btn-warning\" \n          type=\"button\"\n          (click)=\"close()\">\n          <span class=\"fa fa-times\"></span>\n          Cancel\n        </button>\n      </form>\n    </div>\n\n    <!--<datepicker [(ngModel)]=\"date\" showWeeks=\"true\"></datepicker>-->\n\n    <div *ngIf=\"!editMode\">\n      <div class=\"doc\">\n        <auto-form-read\n          [fields]=\"donationFieldsOrder\"\n          [data]=\"donation\"\n          >\n        </auto-form-read>\n      </div>\n\n      <button\n        class=\"btn btn-warning\" \n        type=\"button\"\n        (click)=\"close()\">\n        <span class=\"fa fa-times\"></span>\n        Close\n      </button>\n    </div>\n\n    Closure will lead to: {{prevNavState}}\n  ",
            styles: ["\n    .fa {font-size: 1.2em;}\n    .doc {\n      border:1px solid Gainsboro;\n      border-radius:5px;\n      background-color: #eff5f5;\n      padding:6px;\n      margin-bottom:12px;\n    }"],
            styleUrls: ["client/components/form.css"]
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, recipient_service_1.RecipientService, error_service_1.ErrorService, fields_service_1.FieldsService, forms_1.FormBuilder])
    ], EditDonation);
    return EditDonation;
}());
exports.EditDonation = EditDonation;
//# sourceMappingURL=donation.component.js.map