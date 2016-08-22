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
var currency_service_1 = require('../services/currency.service');
var Currency = (function () {
    function Currency(_currencyService) {
        this._currencyService = _currencyService;
        this.currencies = [];
    }
    Currency.prototype.ngOnInit = function () {
        this._getCurrencies();
    };
    Currency.prototype._getCurrencies = function () {
        var _this = this;
        this._currencyService.getCurrencies()
            .subscribe(function (currencies) {
            console.log('currencies', currencies);
            _this.currencies = currencies;
        }, function (error) { ; } //this.errorService.handleError(error)
         //this.errorService.handleError(error)
        );
    };
    Currency = __decorate([
        core_1.Component({
            template: "\n    <div>Currencies</div>\n\n    <ul>\n      <li *ngFor=\"let currency of currencies\">\n        {{currency.name}}\n      </li>\n    </ul>\n  "
        }), 
        __metadata('design:paramtypes', [currency_service_1.CurrencyService])
    ], Currency);
    return Currency;
}());
exports.Currency = Currency;
//# sourceMappingURL=currency.component.js.map