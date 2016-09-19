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
var settings_service_1 = require('../services/settings.service');
var error_service_1 = require('../services/error.service');
var Currencies = (function () {
    function Currencies(currencyService, settingsService, errorService) {
        this.currencyService = currencyService;
        this.settingsService = settingsService;
        this.errorService = errorService;
        this.currencies = [];
        this.selectedCurrency = null;
    }
    Currencies.prototype.ngOnInit = function () {
        this.getCurrencies();
    };
    Currencies.prototype.getCurrencies = function () {
        var _this = this;
        this.settingsService.getDefaultCurrency().subscribe(function (defaultCurrency) {
            console.log('defaultCurrency', defaultCurrency);
            _this.defaultCurrency = defaultCurrency;
            _this.currencyService.getCurrencies().subscribe(function (currencies) { _this.currencies = currencies; }, function (error) { return _this.errorService.handleError(error); });
        }, function (error) { return _this.errorService.handleError(error); });
    };
    Currencies.prototype.selectCurrencyIndex = function (i) {
        this.selectedCurrency = i;
    };
    Currencies.prototype.setDefault = function (currencyCode) {
        var _this = this;
        this.defaultCurrency = currencyCode;
        this.settingsService.setDefaultCurrency(currencyCode).subscribe(function (defaultCurrency) { _this.defaultCurrency = defaultCurrency; console.log('new currency received', defaultCurrency); }, function (error) { return _this.errorService.handleError(error); });
    };
    Currencies = __decorate([
        core_1.Component({
            template: "\n    <table class=\"table table-striped\">\n      <thead>\n        <tr>\n          <th class=\"text-center\">Default</th>\n          <th>Name</th>\n          <th>Code</th>\n          <th>Symbol</th>\n          <th></th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let currency of currencies; let i=index\"\n          on-mouseover=\"selectCurrencyIndex(i)\">\n          <td class=\"text-center\">\n            <span [ngClass]=\"{'fa fa-check':defaultCurrency == currency.code}\"></span>\n          </td>\n          <td>{{currency.name}}</td>\n          <td>{{currency.code}}</td>\n          <td>{{currency.symbol}}</td>\n          <td>\n            <button \n              class=\"btn btn-default btn-sm\"\n              type=\"button\" \n              [disabled]=\"currency.isDefault\" \n              (click)=\"setDefault(currency.code)\">\n              Set as default\n            </button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  ",
            styles: ["\n    .hover:hover {cursor:pointer;}\n    tr:nth-child(odd) >td {\n      background-color:#faebeb;\n    }\n    tr:nth-child(even) >td {\n      background-color:#fdfdff;\n    }\n    tr:hover >td{\n     background-color:#ccffcc;\n    }\n    .fa{\n      font-size:1.2em;\n      color:green;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [currency_service_1.CurrencyService, settings_service_1.SettingsService, error_service_1.ErrorService])
    ], Currencies);
    return Currencies;
}());
exports.Currencies = Currencies;
//# sourceMappingURL=currencies.component.js.map