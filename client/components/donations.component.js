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
var router_1 = require('@angular/router');
var donation_service_1 = require('../services/donation.service');
var recipient_service_1 = require('../services/recipient.service');
var error_service_1 = require('../services/error.service');
var donation_model_1 = require('../models/donation.model');
var Donations = (function () {
    function Donations(donationService, recipientService, errorService, route, router) {
        this.donationService = donationService;
        this.recipientService = recipientService;
        this.errorService = errorService;
        this.route = route;
        this.router = router;
        this.currentDonation = null;
        this.currentRecipient = null;
        this.selectedDonation = null;
        this.isEdit = false;
        this.isNew = false;
    }
    Donations.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            if (params['id']) {
                console.log('fetching donation ', params['id']);
                _this.getDonation(params['id']);
            }
        });
        this.donationService.added.subscribe(function (addedDonation) {
            _this.currentDonation = null;
            _this.donations.push(addedDonation);
        });
        this.donationService.closed.subscribe(function (closedDonation) { _this.currentDonation = null; });
    };
    Donations.prototype.getDonation = function (donationId) {
        var _this = this;
        this.donationService.getDonation(donationId).subscribe(function (result) {
            console.log('result', result);
            _this.currentDonation = result.donations[0];
            _this.recipientId = result._id;
        }, function (error) { return _this.errorService.handleError(error); });
    };
    /*
      getDonations(recipientId: string) {
        this.donationService.getDonations(recipientId)
          .subscribe(
            donations => {
              this.donations = donations.map(donation => donation.donation);
              if (!recipientId) {
                this.recipientIds = donations.map(donation => donation.recipient);
              }
            },
            error => this.errorService.handleError(error)
          );
      }
    
      getRecipient(recipientId: string) {
        if (recipientId) {
          this.recipientService.getRecipient(recipientId).subscribe(
            recipient => {this.currentRecipient = recipient;},
            error => this.errorService.handleError(error)
          );
        }
      }
    */
    Donations.prototype.selectDonation = function (donation) {
        this.currentDonation = donation;
    };
    Donations.prototype.editDonation = function (donation) {
        this.isEdit = true;
        this.currentDonation = donation;
    };
    Donations.prototype.selectDonationIndex = function (i) {
        this.selectedDonation = i;
    };
    Donations.prototype.addDonation = function () {
        this.isNew = true;
        this.currentDonation = new donation_model_1.Donation('EUR', 10, 'creditcard', new Date(), '');
    };
    Donations.prototype.onSelectedRecipientId = function (recipientId) {
        //New donation, recipient selected
        this.recipientId = recipientId;
        this.isEdit = true;
    };
    Donations.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    Donations = __decorate([
        core_1.Component({
            template: "\n    <div *ngIf=\"!currentDonation\">\n      <alert type=\"info\">\n        <button \n          type=\"button\"\n          (click)=\"addDonation()\"\n          class=\"btn btn-primary\">\n          <span class=\"fa fa-plus\"></span>\n          Add Donation\n        </button>\n      </alert>\n\n      <donations\n        [recipientId]=\"''\">\n      </donations>\n    </div>\n\n    <div *ngIf=\"currentDonation\">\n      <div *ngIf=\"isNew && !recipientId\">\n        <new-recipient\n          (selectedRecipientId)=\"onSelectedRecipientId($event)\">\n        </new-recipient>\n      </div>\n\n      <div *ngIf=\"!isNew || recipientId\">\n        <donation\n          [donation]=\"currentDonation\"\n          [recipientId]=\"recipientId || recipientIds[selectedDonation]?.id\"\n          [editMode]=\"isEdit\">\n        </donation>\n      </div>\n    </div>\n  ",
            styles: ["\n  td:hover {cursor:pointer;}\n  tr:nth-child(odd) >td {\n    background-color:#eff5f5;\n  }\n  tr:nth-child(even) >td {\n    background-color:#fdfdff;\n  }\n  tr:hover >td{\n   background-color:#ccffcc;\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, recipient_service_1.RecipientService, error_service_1.ErrorService, router_1.ActivatedRoute, router_1.Router])
    ], Donations);
    return Donations;
}());
exports.Donations = Donations;
//# sourceMappingURL=donations.component.js.map