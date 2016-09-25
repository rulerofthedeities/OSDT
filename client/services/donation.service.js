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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var auth_service_1 = require('./auth.service');
var DonationService = (function () {
    function DonationService(_http, authService) {
        this._http = _http;
        this.authService = authService;
        this.closeToView = new core_1.EventEmitter();
        this.closeToDoc = new core_1.EventEmitter();
    }
    DonationService.prototype.getDonations = function (recipientId) {
        var token = this.authService.getToken();
        var url = '/api/donations' + (recipientId ? '/recipients/' + recipientId : '') + token;
        return this._http.get(url)
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    DonationService.prototype.getDonation = function (donationId) {
        var token = this.authService.getToken();
        var url = '/api/donations' + (donationId ? '/' + donationId : '') + token;
        return this._http.get(url)
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    DonationService.prototype.addDonation = function (donation, recipientId) {
        var token = this.authService.getToken();
        var body = JSON.stringify({ donation: donation, recipientId: recipientId });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post('/api/donations' + token, body, { headers: headers })
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    DonationService.prototype.updateDonation = function (donation) {
        var token = this.authService.getToken();
        var body = JSON.stringify(donation);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.put('/api/donations' + token, body, { headers: headers })
            .map(function (response) { return donation; }) //server does not return latest state!
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    DonationService.prototype.removeDonation = function (donationId, recipientId) {
        var token = this.authService.getToken();
        return this._http.delete('/api/donations/' + donationId + '/' + recipientId + token)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    DonationService.prototype.closeDonation = function (targetState, donation) {
        if (donation === void 0) { donation = null; }
        switch (targetState) {
            case 'viewDonation':
                this.closeToView.emit(donation);
                break;
            case 'docDonation':
            default:
                this.closeToDoc.emit(donation);
                break;
        }
    };
    DonationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
    ], DonationService);
    return DonationService;
}());
exports.DonationService = DonationService;
//# sourceMappingURL=donation.service.js.map