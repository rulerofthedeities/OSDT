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
var recipient_model_1 = require('../models/recipient.model');
var fields_service_1 = require('../services/fields.service');
var recipient_service_1 = require('../services/recipient.service');
var error_service_1 = require('../services/error.service');
var EditRecipient = (function () {
    function EditRecipient(recipientService, errorService, fieldsService, formBuilder) {
        this.recipientService = recipientService;
        this.errorService = errorService;
        this.fieldsService = fieldsService;
        this.formBuilder = formBuilder;
        this.recipientFields = {};
    }
    EditRecipient.prototype.ngOnInit = function () {
        var _this = this;
        if (this.recipient._id) {
            //Retrieve all data in case of an existing recipient
            this.recipientService.getRecipient(this.recipient._id).subscribe(function (recipient) {
                _this.recipient = recipient;
            }, function (error) { return _this.errorService.handleError(error); });
        }
        this.buildForm();
        this.recipientFields = this.fieldsService.getFields('recipient').assoc;
    };
    EditRecipient.prototype.buildForm = function () {
        this.recipientForm = this.formBuilder.group({
            'name': [this.recipient.name, forms_1.Validators.required],
            'description': [this.recipient.description],
            'categories': [this.recipient.categories],
            'isActive': [this.recipient.isActive]
        });
    };
    EditRecipient.prototype.submitForm = function (recipient) {
        var _this = this;
        if (this.recipient._id) {
            //Update recipient
            recipient._id = this.recipient._id;
            recipient.categories = this.formatCategories(recipient.categories);
            this.recipientService.updateRecipient(recipient).subscribe(function (update) { console.log('update', update); }, function (error) { return _this.errorService.handleError(error); });
        }
        else {
            //Add recipient
            recipient.userId = this.recipient.userId;
            recipient.categories = this.formatCategories(recipient.categories);
            console.log(recipient.categories);
            this.recipientService.addRecipient(recipient).subscribe(function (recipient) { console.log('added recipient', recipient); }, function (error) { return _this.errorService.handleError(error); });
        }
    };
    EditRecipient.prototype.formatCategories = function (cats) {
        var categories;
        categories = cats.toString().split(',');
        return categories.map(function (category) { return category.trim(); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', recipient_model_1.Recipient)
    ], EditRecipient.prototype, "recipient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EditRecipient.prototype, "editMode", void 0);
    EditRecipient = __decorate([
        core_1.Component({
            selector: 'recipient',
            template: "RECIPIENT\n    <form \n      [formGroup]=\"recipientForm\" \n      class=\"form-horizontal\" \n      (submit)=\"submitForm(recipientForm.value)\">\n\n      <pre>{{recipient|json}}</pre>\n\n      <div class=\"form-group\">\n        <auto-field \n          [field]=\"recipientFields['name']\"\n          [data]=\"recipient\"\n          [form]=\"recipientForm\">\n        </auto-field>\n      </div>\n\n      <div class=\"form-group\">\n        <auto-field \n          [field]=\"recipientFields['description']\"\n          [data]=\"recipient\"\n          [form]=\"recipientForm\">\n        </auto-field>\n      </div>\n\n      <div class=\"form-group\">\n        <auto-field \n          [field]=\"recipientFields['categories']\"\n          [data]=\"recipient\"\n          [form]=\"recipientForm\">\n        </auto-field>\n      </div>\n\n      <div class=\"form-group\">\n        <auto-field \n          [field]=\"recipientFields['isActive']\"\n          [data]=\"recipient\"\n          [form]=\"recipientForm\">\n        </auto-field>\n      </div>\n\n      <button \n        type=\"submit\"\n        [disabled]=\"!recipientForm.valid\" \n        class=\"btn btn-primary col-xs-offset-2\">\n        {{recipient._id ? \"Update recipient\" : \"Save recipient\"}}\n      </button>\n    </form>\n  "
        }), 
        __metadata('design:paramtypes', [recipient_service_1.RecipientService, error_service_1.ErrorService, fields_service_1.FieldsService, forms_1.FormBuilder])
    ], EditRecipient);
    return EditRecipient;
}());
exports.EditRecipient = EditRecipient;
//# sourceMappingURL=recipient.component.js.map