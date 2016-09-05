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
var error_service_1 = require('../services/error.service');
var fields_service_1 = require('../services/fields.service');
var EditDonation = (function () {
    function EditDonation(donationService, errorService, fieldsService, formBuilder) {
        this.donationService = donationService;
        this.errorService = errorService;
        this.fieldsService = fieldsService;
        this.formBuilder = formBuilder;
        this.donationFields = {};
    }
    EditDonation.prototype.ngOnInit = function () {
        this.donationForm = this.formBuilder.group({
            'paymentType': [this.donation.paymentType, forms_1.Validators.required],
            'amount': [this.donation.amount, forms_1.Validators.required],
            'note': [this.donation.amount],
            'currency': [this.donation.amount, forms_1.Validators.required]
        });
        this.donationFields = this.fieldsService.getDonationFields();
    };
    EditDonation.prototype.submitForm = function (donation) {
        /*donation.dtPaid = new Date();
        donation.recipientId = '57bb3aa95b315169c0c5cb49';
        */
        console.log('submit donation', JSON.stringify(this.donationForm.value));
        /*
            this.donationService.addDonation(donation)
              .subscribe(
                  data => {console.log('added donation', data);},
                  error => this.errorService.handleError(error)
              );
          }
          */
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', donation_model_1.Donation)
    ], EditDonation.prototype, "donation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EditDonation.prototype, "editMode", void 0);
    EditDonation = __decorate([
        core_1.Component({
            selector: 'donation',
            template: "\n  NEW DONATION\n  <form \n    [formGroup]=\"donationForm\" \n    class=\"form-horizontal\" \n    (submit)=\"submitForm()\">\n\n    <pre>{{donation|json}}</pre>\n\n    <div class=\"form-group\">\n      <auto-field \n        [field]=\"donationFields['paymentType']\"\n        [data]=\"donation\"\n        [form]=\"donationForm\">\n      </auto-field>\n    </div>\n\n    <div class=\"form-group\">\n      <auto-field \n        [field]=\"donationFields['amount']\"\n        [data]=\"donation\"\n        [form]=\"donationForm\">\n      </auto-field>\n    </div>\n\n    <div class=\"form-group\">\n      <auto-field \n        [field]=\"donationFields['currency']\"\n        [data]=\"donation\"\n        [form]=\"donationForm\">\n      </auto-field>\n    </div>\n\n    <div class=\"form-group\">\n      <auto-field \n        [field]=\"donationFields['note']\"\n        [data]=\"donation\"\n        [form]=\"donationForm\">\n      </auto-field>\n    </div>\n\n  <button \n    type=\"submit\"\n    [disabled]=\"!donationForm.valid\" \n    class=\"btn btn-primary\">\n    Save\n  </button>\n\n  </form>\n\n\n  "
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, error_service_1.ErrorService, fields_service_1.FieldsService, forms_1.FormBuilder])
    ], EditDonation);
    return EditDonation;
}());
exports.EditDonation = EditDonation;
//# sourceMappingURL=donation.component.js.map