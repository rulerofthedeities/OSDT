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
require('rxjs/Rx');
var Observable_1 = require('rxjs/Observable');
var RecipientService = (function () {
    function RecipientService(_http) {
        this._http = _http;
        this.closeToView = new core_1.EventEmitter();
        this.closeToDoc = new core_1.EventEmitter();
    }
    RecipientService.prototype.getRecipients = function (activeOnly) {
        var url = '/api/recipients';
        url += activeOnly ? '?active=1' : '';
        return this._http.get(url)
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    RecipientService.prototype.getRecipient = function (recipientId) {
        return this._http.get('/api/recipients/' + recipientId)
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    RecipientService.prototype.addRecipient = function (recipient) {
        recipient.name = this.toProperCase(recipient.name); //for sorting
        var body = JSON.stringify(recipient);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post('/api/recipients', body, { headers: headers })
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    RecipientService.prototype.updateRecipient = function (recipient) {
        recipient.name = this.toProperCase(recipient.name); //for sorting
        var body = JSON.stringify(recipient);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.put('/api/recipients', body, { headers: headers })
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    RecipientService.prototype.closeRecipient = function (targetState, recipient) {
        if (recipient === void 0) { recipient = null; }
        switch (targetState) {
            case 'view':
                this.closeToView.emit(recipient);
                break;
            case 'doc':
            default:
                this.closeToDoc.emit(recipient);
                break;
        }
    };
    RecipientService.prototype.toProperCase = function (word) {
        return word[0].toUpperCase() + word.slice(1);
    };
    RecipientService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RecipientService);
    return RecipientService;
}());
exports.RecipientService = RecipientService;
//# sourceMappingURL=recipient.service.js.map