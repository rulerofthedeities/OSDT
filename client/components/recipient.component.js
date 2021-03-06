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
var http_1 = require('@angular/http');
var recipient_model_1 = require('../models/recipient.model');
var fields_service_1 = require('../services/fields.service');
var recipient_service_1 = require('../services/recipient.service');
var validation_service_1 = require('../services/validation.service');
var auth_service_1 = require('../services/auth.service');
var error_service_1 = require('../services/error.service');
var EditRecipient = (function () {
    function EditRecipient(recipientService, errorService, fieldsService, authService, formBuilder, http) {
        this.recipientService = recipientService;
        this.errorService = errorService;
        this.fieldsService = fieldsService;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.http = http;
        this.recipientFieldsAssoc = {};
        this.isCollapsedLog = true;
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
            'name': [
                this.recipient.name,
                forms_1.Validators.required,
                validation_service_1.ValidationService.checkUniqueRecipient(this.http, this.authService, this.recipient._id)
            ],
            'description': [this.recipient.description],
            'categories': [this.recipient.categories],
            'url': [this.recipient.url],
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
            this.recipientService.updateRecipient(recipient).subscribe(function () {
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
    EditRecipient.prototype.searchCats = function (cats) {
        var _this = this;
        if (cats.length > 0) {
            this.recipientService.searchCategories(cats).subscribe(function (cats) { _this.cats = cats || []; }, function (error) { return _this.errorService.handleError(error); });
        }
        else {
            this.cats = [];
        }
    };
    EditRecipient.prototype.addCategory = function (newCat) {
        var cat = [];
        cat[0] = this.recipientForm.controls['categories'].value;
        cat[1] = newCat;
        cat = cat.filter(function (c) { return !!c; });
        this.recipientForm.patchValue({ 'categories': cat.join(',') });
    };
    EditRecipient.prototype.toggleEditMode = function () {
        this.editMode = !this.editMode;
        this.prevNavState = this.editMode ? 'docRecipient' : 'viewRecipient';
    };
    EditRecipient.prototype.cancel = function (confirm) {
        if (this.recipientForm.dirty) {
            confirm.showModal = true;
        }
        else {
            this.close();
        }
    };
    EditRecipient.prototype.onCancelConfirmed = function (cancelOk) {
        if (cancelOk) {
            this.close();
        }
    };
    EditRecipient.prototype.print = function () {
        window.print();
    };
    EditRecipient.prototype.getCurrentDate = function () {
        return new Date();
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
            template: "\n    <alert type=\"info\" *ngIf=\"!editMode\" class=\"hidden-print\">\n      <button *ngIf=\"!editMode\"\n        type=\"button\"\n        class=\"btn btn-primary\" \n        (click)=\"toggleEditMode()\">\n        <span class=\"fa fa-pencil\"></span>\n        Edit Mode\n      </button>\n\n      <button \n        type=\"button\" \n        class=\"btn btn-primary\"\n        (click)=\"isCollapsedLog = !isCollapsedLog\">\n        <span class=\"fa fa-th-list\" [style.color]=\"isCollapsedLog ? 'white': 'lightgrey'\"></span>\n        {{isCollapsedLog ? 'Show Update Log' : 'Hide Update Log'}}\n      </button>\n\n      <button *ngIf=\"!editMode\"\n        type=\"button\"\n        class=\"btn btn-primary\" \n        (click)=\"print()\">\n        <span class=\"fa fa-print\"></span>\n        Print\n      </button>\n\n    </alert>\n    \n    <div class=\"doc\" *ngIf=\"editMode && recipientForm\">\n      <form\n        [formGroup]=\"recipientForm\" \n        class=\"form-horizontal\">\n\n        <div class=\"form-group\">\n          <auto-field \n            [field]=\"recipientFieldsAssoc['name']\"\n            [data]=\"recipient\"\n            [form]=\"recipientForm\">\n          </auto-field>\n        </div>\n\n        <div class=\"form-group\">\n          <auto-field \n            [field]=\"recipientFieldsAssoc['description']\"\n            [data]=\"recipient\"\n            [form]=\"recipientForm\">\n          </auto-field>\n        </div>\n\n        <div class=\"form-group\">\n          <auto-field \n            [field]=\"recipientFieldsAssoc['categories']\"\n            [data]=\"recipient\"\n            [form]=\"recipientForm\">\n          </auto-field>\n        </div>\n\n        <div class=\"col-xs-offset-2\">\n          <div class=\"searchcats\">\n            Search Categories:\n            <input type=\"text\"\n              (keyup)=\"searchCats(searchcats.value)\"\n              #searchcats>\n          </div>\n          <ul class=\"cats list-unstyled\">\n            <li *ngFor=\"let cat of cats\" \n              (click)=\"addCategory(cat.name)\"\n              class=\"label label-warning\">\n                {{cat.name}}\n            </li>\n          </ul>\n        </div>\n\n        <div class=\"form-group\">\n          <auto-field \n            [field]=\"recipientFieldsAssoc['url']\"\n            [data]=\"recipient\"\n            [form]=\"recipientForm\">\n          </auto-field>\n        </div>\n\n        <div class=\"form-group\">\n          <auto-field \n            [field]=\"recipientFieldsAssoc['isActive']\"\n            [data]=\"recipient\"\n            [form]=\"recipientForm\">\n          </auto-field>\n        </div>\n\n        <button \n          type=\"click\"\n          (click)=\"submitForm(recipientForm.value, 'docRecipient')\"\n          [disabled]=\"!recipientForm.valid\" \n          class=\"btn btn-success col-xs-offset-2\">\n          <span class=\"fa fa-check\"></span>\n          Save\n        </button>\n\n        <button \n          type=\"submit\"\n          (click)=\"submitForm(recipientForm.value, 'viewRecipient')\"\n          [disabled]=\"!recipientForm.valid\" \n          class=\"btn btn-success\">\n          <span class=\"fa fa-check\"></span>\n          Save & Close\n        </button>\n\n        <button\n          class=\"btn btn-warning\" \n          type=\"button\"\n          (click)=\"cancel(confirm)\">\n          <span class=\"fa fa-times\"></span>\n          Cancel\n        </button>\n      </form>\n    </div>\n    \n    <div *ngIf=\"!editMode\">\n    \n      <div class=\"doc\">\n        <auto-form-read\n          [fields]=\"recipientFieldsOrder\"\n          [data]=\"recipient\"\n          >\n        </auto-form-read>\n        <div [collapse]=\"isCollapsedLog\" class=\"row\">\n          <label \n            class=\"control-label col-xs-2 text-right\">\n            Update history\n          </label>\n          <div class=\"log col-xs-10\">\n            <table class=\"table table-hover small\">\n              <thead>\n                <tr>\n                  <th>Date</th>\n                  <th>Action</th>\n                  <th>User</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let update of recipient.updateLog\">\n                  <td class=\"date\">{{update.dt | date:'medium'}}</td>\n                  <td>{{update.action}}</td>\n                  <td>{{update.user}}</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"read-buttons hidden-print\">\n        <button\n          class=\"btn btn-warning\" \n          type=\"button\"\n          (click)=\"close()\">\n          <span class=\"fa fa-times\"></span>\n          Close\n        </button>\n      </div>\n    </div>\n\n    <modal-confirm #confirm\n      [level]=\"'warning'\"\n      (confirmed)=\"onCancelConfirmed($event)\"\n      class=\"hidden-print\">\n      <div title>Warning</div>\n      <div message>The recipient has been modified. Are you sure you want to cancel the changes?</div>\n    </modal-confirm>\n\n\n    <div class=\"visible-print-block small\">\n      <em>Printed on {{getCurrentDate()|date:'medium'}}</em>\n    </div>\n\n\n    <!-- Closure will lead to: {{prevNavState}} -->\n  ",
            styles: ["\n    .doc {\n      border:1px solid Gainsboro;\n      border-radius:5px;\n      background-color: #fffae6;\n      padding:6px;\n      margin-bottom:12px;\n    }\n    .label {\n      margin:2px;\n      cursor:pointer;\n    }\n    .cats {\n      margin-top:6px;\n    }\n    .searchcats {\n      font-size:0.8em;\n    }\n    .log{\n      max-width:400px;\n    }\n    .log .date {\n      width: 160px;\n    }\n    .log tr>th, .log tr>td {\n      line-height:0.5;\n    }\n    .log tr>td {\n      cursor: default;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [recipient_service_1.RecipientService, error_service_1.ErrorService, fields_service_1.FieldsService, auth_service_1.AuthService, forms_1.FormBuilder, http_1.Http])
    ], EditRecipient);
    return EditRecipient;
}());
exports.EditRecipient = EditRecipient;
