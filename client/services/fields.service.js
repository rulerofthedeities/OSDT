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
var field_textbox_model_1 = require('../models/fields/field-textbox.model');
var field_textarea_model_1 = require('../models/fields/field-textarea.model');
var field_dropdown_model_1 = require('../models/fields/field-dropdown.model');
var field_radio_model_1 = require('../models/fields/field-radio.model');
var field_date_model_1 = require('../models/fields/field-date.model');
var FieldsService = (function () {
    function FieldsService() {
    }
    FieldsService.prototype.getDonationFields = function () {
        var fields = [
            new field_dropdown_model_1.DropdownField({
                key: 'paymentType',
                label: 'Payment Type',
                options: [
                    { key: 'creditcard', display: 'Credit Card' },
                    { key: 'debitcard', display: 'Debit Card' },
                    { key: 'paypal', display: 'Paypal' },
                    { key: 'cash', display: 'Cash' }
                ]
            }),
            new field_radio_model_1.RadioField({
                key: 'currency',
                label: 'Currency',
                buttons: [
                    { key: 'EUR', display: 'Euro' },
                    { key: 'USD', display: 'US Dollar' }
                ]
            }),
            new field_textbox_model_1.TextboxField({
                key: 'amount',
                label: 'Amount',
                type: 'number'
            }),
            new field_textarea_model_1.TextareaField({
                key: 'note',
                label: 'Notes',
                rows: 6,
                cols: 20
            }),
            new field_date_model_1.DateField({
                key: 'dtPaid',
                label: 'Date paid'
            })
        ];
        var fieldArr = {};
        fields.forEach(function (field) { return fieldArr[field.key] = field; });
        return fieldArr;
    };
    FieldsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FieldsService);
    return FieldsService;
}());
exports.FieldsService = FieldsService;
//# sourceMappingURL=fields.service.js.map