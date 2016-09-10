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
        this.recipientFieldsAssoc = {};
    }
    EditRecipient.prototype.ngOnInit = function () {
        var _this = this;
        this.recipientService.closeToDoc.subscribe(function (closedRecipient) {
            _this.recipient = closedRecipient ? closedRecipient : _this.recipient;
            _this.toggleEditMode();
        });
        if (this.recipient._id) {
            //read/edit existing doc
            this.retrieveRecipient();
        }
        else {
            //new doc
            this.buildForm();
        }
        var fields = this.fieldsService.getFields('recipient');
        this.recipientFieldsAssoc = fields.assoc;
        this.recipientFieldsOrder = fields.ordered;
    };
    EditRecipient.prototype.buildForm = function () {
        this.recipientForm = this.formBuilder.group({
            'name': [this.recipient.name, forms_1.Validators.required],
            'description': [this.recipient.description],
            'categories': [this.recipient.categories],
            'isActive': [this.recipient.isActive]
        });
    };
    EditRecipient.prototype.retrieveRecipient = function () {
        var _this = this;
        //Retrieve all data in case of an existing recipient
        //Note: Input() recipient doesn't contain all data
        this.recipientService.getRecipient(this.recipient._id).subscribe(function (recipient) {
            _this.recipient = recipient;
            _this.buildForm();
        }, function (error) { return _this.errorService.handleError(error); });
    };
    EditRecipient.prototype.submitForm = function (recipient, target) {
        var _this = this;
        if (this.recipient._id) {
            //Update recipient
            recipient._id = this.recipient._id;
            recipient.categories = this.formatCategories(recipient.categories);
            this.recipientService.updateRecipient(recipient).subscribe(function (update) {
                _this.recipient = recipient;
                _this.recipientService.closeRecipient(target, recipient);
            }, function (error) { return _this.errorService.handleError(error); });
        }
        else {
            //Add recipient
            recipient.userId = this.recipient.userId;
            recipient.categories = this.formatCategories(recipient.categories);
            this.recipientService.addRecipient(recipient).subscribe(function (recipient) {
                _this.recipient = recipient;
                _this.recipientService.closeRecipient(target, recipient);
            }, function (error) { return _this.errorService.handleError(error); });
        }
    };
    EditRecipient.prototype.formatCategories = function (cats) {
        var categories;
        categories = cats.toString().split(',');
        return categories.map(function (category) { return category.trim(); });
    };
    EditRecipient.prototype.toggleEditMode = function () {
        this.editMode = !this.editMode;
        this.prevNavState = this.editMode ? 'doc' : 'view';
    };
    EditRecipient.prototype.close = function () {
        this.recipientService.closeRecipient(this.prevNavState);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', recipient_model_1.Recipient)
    ], EditRecipient.prototype, "recipient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EditRecipient.prototype, "editMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EditRecipient.prototype, "prevNavState", void 0);
    EditRecipient = __decorate([
        core_1.Component({
            selector: 'recipient',
            template: "\n    <alert type=\"info\">\n      <button *ngIf=\"!editMode\"\n        class=\"btn btn-primary\" \n        type=\"button\"\n        (click)=\"toggleEditMode()\">\n        <span class=\"fa fa-pencil\"></span>\n        Edit Mode\n      </button>\n    </alert>\n    <div class=\"doc\" *ngIf=\"editMode && recipientForm\">\n      <form\n        [formGroup]=\"recipientForm\" \n        class=\"form-horizontal\">\n\n        <auto-form \n          [fields]=\"recipientFieldsOrder\"\n          [data]=\"recipient\"\n          [form]=\"recipientForm\">\n        </auto-form>\n\n        <button \n          type=\"click\"\n          (click)=\"submitForm(recipientForm.value, 'doc')\"\n          [disabled]=\"!recipientForm.valid\" \n          class=\"btn btn-success col-xs-offset-2\">\n          <span class=\"fa fa-check\"></span>\n          Save\n        </button>\n\n        <button \n          type=\"submit\"\n          (click)=\"submitForm(recipientForm.value, 'view')\"\n          [disabled]=\"!recipientForm.valid\" \n          class=\"btn btn-success\">\n          <span class=\"fa fa-check\"></span>\n          Save & Close\n        </button>\n\n        <button\n          class=\"btn btn-warning\" \n          type=\"button\"\n          (click)=\"close()\">\n          <span class=\"fa fa-times\"></span>\n          Cancel\n        </button>\n      </form>\n    </div>\n    \n    <div *ngIf=\"!editMode\">\n      <div class=\"doc\">\n        <auto-form-read\n          [fields]=\"recipientFieldsOrder\"\n          [data]=\"recipient\"\n          >\n        </auto-form-read>\n      </div>\n\n      <button\n        class=\"btn btn-warning\" \n        type=\"button\"\n        (click)=\"close()\">\n        <span class=\"fa fa-times\"></span>\n        Close\n      </button>\n    </div>\n\n    Closure will lead to: {{prevNavState}}\n  ",
            styles: ["\n    .doc {\n      border:1px solid Gainsboro;\n      border-radius:5px;\n      background-color: #fffae6;\n      padding:6px;\n      margin-bottom:12px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [recipient_service_1.RecipientService, error_service_1.ErrorService, fields_service_1.FieldsService, forms_1.FormBuilder])
    ], EditRecipient);
    return EditRecipient;
}());
exports.EditRecipient = EditRecipient;
//# sourceMappingURL=recipient.component.js.map