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
var recipient_model_1 = require('../models/recipient.model');
var EditRecipient = (function () {
    function EditRecipient() {
    }
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
            template: "Recipient\n    <pre>{{recipient|json}}</pre>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], EditRecipient);
    return EditRecipient;
}());
exports.EditRecipient = EditRecipient;
//# sourceMappingURL=recipient.component.js.map