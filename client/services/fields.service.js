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
var field_textbox_model_1 = require('../models/field-textbox.model');
var field_dropdown_model_1 = require('../models/field-dropdown.model');
var field_radio_model_1 = require('../models/field-radio.model');
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
                ],
                order: 3
            }),
            new field_radio_model_1.RadioField({
                key: 'currency',
                label: 'Currency',
                buttons: [
                    { key: 'EUR', display: 'Euro' },
                    { key: 'USD', display: 'US Dollar' }
                ],
                value: 'EUR',
                order: 2
            }),
            new field_textbox_model_1.TextboxField({
                key: 'amount',
                label: 'Amount',
                type: 'number',
                value: 10,
                order: 1
            }),
            new field_textbox_model_1.TextboxField({
                key: 'note',
                label: 'Note',
                type: 'text',
                order: 4
            })
        ];
        return fields.sort(function (a, b) { return a.order - b.order; });
    };
    FieldsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FieldsService);
    return FieldsService;
}());
exports.FieldsService = FieldsService;
//# sourceMappingURL=fields.service.js.map