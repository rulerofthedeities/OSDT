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
var RecipientService = (function () {
    function RecipientService(_http, authService) {
        this._http = _http;
        this.authService = authService;
        this.closeToView = new core_1.EventEmitter();
        this.closeToDoc = new core_1.EventEmitter();
    }
    RecipientService.prototype.getRecipients = function (activeOnly) {
        var url = '/api/recipients';
        var token = this.authService.getToken();
        var active = activeOnly ? '&active=1' : '';
        return this._http.get(url + token + active)
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    RecipientService.prototype.getRecipient = function (recipientId) {
        var token = this.authService.getToken();
        return this._http.get('/api/recipients/' + recipientId + token)
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    RecipientService.prototype.addRecipient = function (recipient) {
        recipient.name = this.toProperCase(recipient.name); //for sorting
        var token = this.authService.getToken();
        var body = JSON.stringify(recipient);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post('/api/recipients' + token, body, { headers: headers })
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    RecipientService.prototype.updateRecipient = function (recipient) {
        recipient.name = this.toProperCase(recipient.name); //for sorting
        var token = this.authService.getToken();
        var body = JSON.stringify(recipient);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.put('/api/recipients' + token, body, { headers: headers })
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    RecipientService.prototype.closeRecipient = function (targetState, recipient) {
        if (recipient === void 0) { recipient = null; }
        switch (targetState) {
            case 'viewRecipient':
                this.closeToView.emit(recipient);
                break;
            case 'docRecipient':
            default:
                this.closeToDoc.emit(recipient);
                break;
        }
    };
    RecipientService.prototype.toProperCase = function (word) {
        return word[0].toUpperCase() + word.slice(1);
    };
    RecipientService.prototype.searchCategories = function (search) {
        var token = this.authService.getToken();
        return this._http.get('/api/cats' + token + '&search=' + search)
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    RecipientService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
    ], RecipientService);
    return RecipientService;
}());
exports.RecipientService = RecipientService;
//# sourceMappingURL=recipient.service.js.map