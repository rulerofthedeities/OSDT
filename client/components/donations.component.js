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
var auth_service_1 = require('../services/auth.service');
var error_service_1 = require('../services/error.service');
var donation_model_1 = require('../models/donation.model');
var Donations = (function () {
    function Donations(donationService, authService, errorService, route, router) {
        this.donationService = donationService;
        this.authService = authService;
        this.errorService = errorService;
        this.route = route;
        this.router = router;
        this.currentDonation = null;
        this.selectedDonation = null;
        this.isEdit = false;
        this.isSubView = false; //the donation document was opened from the recipient view
        this.isNew = false;
    }
    Donations.prototype.ngOnInit = function () {
        var _this = this;
        if (this.authService.isLoggedIn()) {
            this.paramSubscription = this.route.params.subscribe(function (params) {
                if (params['id']) {
                    _this.getDonation(params['id']);
                }
            });
            this.querySubscription = this.route.queryParams.subscribe(function (params) {
                if (params['edit']) {
                    _this.isEdit = params['edit'] === '1' ? true : false;
                }
                if (params['sub']) {
                    _this.isSubView = params['sub'] === '1' ? true : false;
                }
                if (params['new']) {
                    console.log('new', params['new']);
                    _this.isSubView = true;
                    _this.recipientId = params['new'];
                    _this.addDonation();
                }
            });
            this.donationService.closeToView.subscribe(function (closedDonation) {
                _this.currentDonation = null; //in case of new
                if (_this.router.url !== '/donations') {
                    _this.router.navigate(['/donations']);
                }
            });
        }
    };
    Donations.prototype.getDonation = function (donationId) {
        var _this = this;
        this.donationService.getDonation(donationId).subscribe(function (result) {
            _this.currentDonation = result.donations[0];
            _this.recipientId = result._id;
        }, function (error) { return _this.errorService.handleError(error); });
    };
    Donations.prototype.addDonation = function () {
        this.isNew = true;
        this.isEdit = true;
        this.currentDonation = new donation_model_1.Donation('EUR', null, 'creditcard', new Date(), '');
    };
    Donations.prototype.cancelNewDonation = function () {
        this.currentDonation = null;
        this.isNew = false;
    };
    Donations.prototype.onSelectedRecipientId = function (recipientId) {
        //New donation, recipient selected
        this.recipientId = recipientId;
        this.isEdit = true;
    };
    Donations.prototype.ngOnDestroy = function () {
        if (this.querySubscription) {
            this.querySubscription.unsubscribe();
        }
        if (this.paramSubscription) {
            this.paramSubscription.unsubscribe();
        }
    };
    Donations = __decorate([
        core_1.Component({
            template: "\n  <section protected>\n    <div *ngIf=\"!currentDonation\">\n      <alert type=\"info\">\n        <button \n          type=\"button\"\n          (click)=\"addDonation()\"\n          class=\"btn btn-primary\">\n          <span class=\"fa fa-plus\"></span>\n          Add Donation\n        </button>\n      </alert>\n\n      <donations>\n      </donations>\n    </div>\n\n    <div *ngIf=\"currentDonation\">\n      <div *ngIf=\"isNew && !recipientId\">\n        <new-recipient\n          (selectedRecipientId)=\"onSelectedRecipientId($event)\">\n        </new-recipient>\n\n        <button\n          class=\"btn btn-warning\" \n          type=\"button\"\n          (click)=\"cancelNewDonation()\">\n          <span class=\"fa fa-times\"></span>\n          Cancel\n        </button>\n      </div>\n\n      <div *ngIf=\"!isNew || recipientId\">\n        <donation\n          [donation]=\"currentDonation\"\n          [recipientId]=\"recipientId || recipientIds[selectedDonation]?.id\"\n          [editMode]=\"isEdit\"\n          [subView]=\"isSubView\">\n        </donation>\n      </div>\n    </div>\n  </section>\n  "
        }), 
        __metadata('design:paramtypes', [donation_service_1.DonationService, auth_service_1.AuthService, error_service_1.ErrorService, router_1.ActivatedRoute, router_1.Router])
    ], Donations);
    return Donations;
}());
exports.Donations = Donations;
//# sourceMappingURL=donations.component.js.map