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
var dashboard_service_1 = require('../services/dashboard.service');
var settings_service_1 = require('../services/settings.service');
var auth_service_1 = require('../services/auth.service');
var error_service_1 = require('../services/error.service');
var moment = require('moment');
var Dashboard = (function () {
    function Dashboard(dashboardService, settingsService, authService, errorService) {
        this.dashboardService = dashboardService;
        this.settingsService = settingsService;
        this.authService = authService;
        this.errorService = errorService;
        this.chartDataLoaded = false;
    }
    Dashboard.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsService.getDefaultCurrency().subscribe(function (currency) {
            _this.dashboardService.getData('totals', currency).subscribe(function (totals) {
                _this.totals = totals;
                _this.calcTotals();
            }, function (error) { return _this.errorService.handleError(error); });
            _this.dashboardService.getData('lists', currency).subscribe(function (lists) { _this.lists = lists; }, function (error) { return _this.errorService.handleError(error); });
            _this.dashboardService.getData('charts', currency).subscribe(function (charts) { return _this.calcChartMonthData(charts['totalPerMonth']); }, function (error) { return _this.errorService.handleError(error); });
        }, function (error) { return _this.errorService.handleError(error); });
    };
    Dashboard.prototype.calcTotals = function () {
        var avg = 0;
        if (this.totals['countDonations'] > 0) {
            avg = this.totals['totalAmount']['total'] / this.totals['countDonations'];
        }
        this.avgDonation = avg;
        avg = 0;
        if (this.totals['countRecipients'] > 0) {
            avg = this.totals['totalAmount']['total'] / this.totals['countRecipients'];
        }
        this.avgRecipient = avg;
    };
    Dashboard.prototype.calcChartMonthData = function (chart) {
        var dt = moment().date(1), month, months = [], amounts = [], numbers = [];
        var _loop_1 = function(i) {
            months[11 - i] = dt.format('MMM') + ' ' + dt.year();
            month = dt.format('YYYYMM');
            chart['totals'].forEach(function (t) {
                if (t.month === month) {
                    amounts[11 - i] = t.donationAmount;
                    numbers[11 - i] = t.numberofDonations;
                }
            });
            dt = moment(dt).subtract(1, 'M');
        };
        for (var i = 0; i < 12; i++) {
            _loop_1(i);
        }
        this.monthlyChartData = {
            series: 'amount',
            currency: chart['currency'],
            xLabels: months,
            amounts: amounts,
            numbers: numbers
        };
        this.chartDataLoaded = true;
    };
    Dashboard.prototype.getChartTitle = function () {
        if (this.monthlyChartData && this.monthlyChartData['series'] === 'number') {
            return 'Number of donations per month';
        }
        else {
            return 'Donations total in ' + this.monthlyChartData['currency'] + ' per month';
        }
    };
    Dashboard = __decorate([
        core_1.Component({
            template: "\n  <section>\n    <div class=\"row\" id=\"top\">\n      <div class=\"col-xs-6\">\n        <div class=\"panel panel-primary\">\n          <div class=\"panel-body\">\n            <div class=\"list-group\">\n              <a class=\"list-group-item main\">\n                Total amount spent\n                <span class=\"badge\">\n                  {{totals?.totalAmount?.total | currency:totals?.totalAmount?.currency:true:'1.2-2'}}\n                </span>\n              </a>\n              <a class=\"list-group-item sub\">\n                Spent this year\n                <span class=\"badge\">\n                  {{totals?.totalAmountThisYear?.total | currency:totals?.totalAmountThisYear?.currency:true:'1.2-2'}}\n                </span>\n              </a>\n              <a class=\"list-group-item sub\">\n                Spent last year\n                <span class=\"badge\">\n                  {{totals?.totalAmountLastYear?.total | currency:totals?.totalAmountLastYear?.currency:true:'1.2-2'}}\n                </span>\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-xs-6\">\n        <div class=\"panel panel-primary\">\n          <div class=\"panel-body\">\n            <div class=\"list-group\">\n              <a class=\"list-group-item sub\">\n                <span class=\"fa fa-user\"></span> Top Recipient: {{lists?.topRecipients?.recipients[0]?.name}}\n                <span class=\"badge\">\n                  {{lists?.topRecipients?.recipients[0]?.totalAmount \n                  | currency:lists?.topRecipients?.currency:true:'1.2-2'}}\n                </span>\n              </a>\n              <a class=\"list-group-item sub\">\n                <span class=\"fa fa-money\"></span> Top Donation: {{lists?.topDonations?.donations[0]?.recipient?.name}}\n                <span class=\"badge\">\n                    {{lists?.topDonations?.donations[0]?.donation.amount \n                    | currency:lists?.topDonations?.donations[0]?.donation.currency:true:'1.2-2'}}\n                </span>\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-12\" *ngIf=\"chartDataLoaded\">\n        <div class=\"panel panel-primary\">\n          <div class=\"panel-body bg-info\">\n            <kendo-chart\n              [categoryAxis]=\"{ categories: monthlyChartData.xLabels }\"\n              [seriesColors]=\"['#428bca', '#d9534f', '#5cb85c']\">\n              <kendo-chart-title [text]=\"getChartTitle()\">\n              </kendo-chart-title>\n              <kendo-chart-y-axis>\n                <kendo-chart-y-axis-item>\n                </kendo-chart-y-axis-item>\n              </kendo-chart-y-axis>\n              <kendo-chart-series>\n                <kendo-chart-series-item \n                  *ngIf=\"monthlyChartData.series === 'amount'\"\n                  type=\"column\"\n                  [data]=\"monthlyChartData.amounts\">\n                </kendo-chart-series-item>\n                <kendo-chart-series-item \n                  *ngIf=\"monthlyChartData.series === 'number'\"\n                  type=\"line\"\n                  [data]=\"monthlyChartData.numbers\">\n                </kendo-chart-series-item>\n              </kendo-chart-series>\n            </kendo-chart>\n            <div class=\"chartSelection\">\n              <label class=\"radio-inline\">\n                <input \n                  type=\"radio\"\n                  [value]=\"'amount'\" \n                  [(ngModel)]=\"monthlyChartData.series\">\n                  Donation amount\n              </label>\n              <label class=\"radio-inline\">\n                <input \n                  type=\"radio\"\n                  [value]=\"'number'\" \n                  [(ngModel)]=\"monthlyChartData.series\">\n                  Number of donations\n              </label>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-6\">\n        <div class=\"panel panel-primary\">\n          <div class=\"panel-heading\">\n            <h1 class=\"panel-title\"><span class=\"fa fa-money\"></span> Donations</h1>\n          </div>\n          <div class=\"panel-body bg-info\">\n            <div class=\"row\">\n              <label class=\"control-label col-xs-4 text-right\">\n                # donations:\n              </label>\n              <div class=\"col-xs-8\">\n                {{totals?.countDonations}}\n              </div>\n            </div>\n            <div class=\"row\">\n              <label class=\"control-label col-xs-4 text-right\">\n                Donation avg:\n              </label>\n              <div class=\"col-xs-8\">\n                {{avgDonation | currency:totals?.totalAmount?.currency:true:'1.2-2'}}\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"panel panel-primary\">\n          <div class=\"panel-body bg-info\">\n            <div class=\"row\">\n              <label class=\"control-label col-xs-12\">\n                Top Donations:\n              </label>\n              <table class=\"table\">\n                <tbody>\n                  <tr *ngFor=\"let donation of lists?.topDonations?.donations; let i = index\">\n                    <td>{{i+1}}</td>\n                    <td>\n                      {{donation.donation.dtPaid | date}}\n                    </td>\n                    <td>\n                      {{donation.recipient.name}}\n                    </td>\n                    <td class=\"text-right\">\n                      {{donation.donation.amount | currency:donation.donation.currency:true:'1.2-2'}}\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-xs-6\">\n        <div class=\"panel panel-primary\">\n          <div class=\"panel-heading\">\n            <h1 class=\"panel-title\"><span class=\"fa fa-user\"></span> Recipients</h1>\n          </div>\n          <div class=\"panel-body bg-info\">\n            <div class=\"row\">\n              <label class=\"control-label col-xs-4 text-right\">\n                # recipientstest:\n              </label>\n              <div class=\"col-xs-8\">\n                {{totals?.countRecipients}}\n              </div>\n            </div>\n            <div class=\"row\">\n              <label class=\"control-label col-xs-4 text-right\">\n                Recipient avg:\n              </label>\n              <div class=\"col-xs-8\">\n                {{avgRecipient | currency:totals?.totalAmount?.currency:true:'1.2-2'}}\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"panel panel-primary\">\n          <div class=\"panel-body bg-info\">\n            <div class=\"row\">\n              <label class=\"control-label col-xs-12\">\n                Top Recipients:\n              </label>\n              <table class=\"table\">\n                <tbody>\n                  <tr *ngFor=\"let recipient of lists?.topRecipients?.recipients; let i = index\">\n                    <td>{{i+1}}</td>\n                    <td>\n                      {{recipient.name}}\n                    </td>\n                    <td class=\"text-right\">\n                      {{recipient.totalAmount | currency:lists?.topRecipients?.currency:true:'1.2-2'}}\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </section>\n  ",
            styles: ["\n    #top .main {font-size:26px;}\n    #top .main span.badge {font-size:26px;}\n    #top .sub {font-size:18px;}\n    #top .sub span.badge {font-size:18px;}\n    .chartSelection {\n      margin-top: 10px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService, settings_service_1.SettingsService, auth_service_1.AuthService, error_service_1.ErrorService])
    ], Dashboard);
    return Dashboard;
}());
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.component.js.map