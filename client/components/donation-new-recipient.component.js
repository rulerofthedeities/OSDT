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
var recipient_service_1 = require('../services/recipient.service');
var error_service_1 = require('../services/error.service');
var DonationNewRecipient = (function () {
    function DonationNewRecipient(recipientService, errorService) {
        this.recipientService = recipientService;
        this.errorService = errorService;
        this.selectedRecipientId = new core_1.EventEmitter();
    }
    DonationNewRecipient.prototype.ngOnInit = function () {
        var _this = this;
        this.recipientService.getRecipients(true).subscribe(function (recipients) { _this.recipients = recipients; }, function (error) { _this.errorService.handleError(error); });
    };
    DonationNewRecipient.prototype.recipientSelected = function (recipientId) {
        this.selectedRecipientId.emit(recipientId);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DonationNewRecipient.prototype, "selectedRecipientId", void 0);
    DonationNewRecipient = __decorate([
        core_1.Component({
            selector: 'new-recipient',
            template: "\n    <form>\n      <label \n        [attr.for]=\"recipient\"\n        class=\"control-label col-xs-2\">\n        Select a recipient\n      </label>\n\n      <select \n        class=\"form-control\"\n        [id]=\"recipient\" \n        (change)=\"recipientSelected(recipient.value)\" \n        #recipient>\n        <option value=\"\">Select a recipient...</option>\n        <option \n          *ngFor=\"let recipient of recipients\" \n          [value]=\"recipient._id\">\n          {{recipient.name}}\n        </option>\n      </select>\n    </form>\n  "
        }), 
        __metadata('design:paramtypes', [recipient_service_1.RecipientService, error_service_1.ErrorService])
    ], DonationNewRecipient);
    return DonationNewRecipient;
}());
exports.DonationNewRecipient = DonationNewRecipient;
//# sourceMappingURL=donation-new-recipient.component.js.map