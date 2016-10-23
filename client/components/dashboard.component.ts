import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {SettingsService} from '../services/settings.service';
import {AuthService} from '../services/auth.service';
import {ErrorService} from '../services/error.service';
import * as moment from 'moment';

@Component({
  template: `
  <section>
    <div class="row" id="top">
      <div class="col-xs-6">
        <div class="panel panel-primary">
          <div class="panel-body">
            <div class="list-group">
              <a class="list-group-item main">
                Total amount spent
                <span class="badge">
                  {{totals?.totalAmount?.total | currency:totals?.totalAmount?.currency:true:'1.2-2'}}
                </span>
              </a>
              <a class="list-group-item sub">
                Spent this year
                <span class="badge">
                  {{totals?.totalAmountThisYear?.total | currency:totals?.totalAmountThisYear?.currency:true:'1.2-2'}}
                </span>
              </a>
              <a class="list-group-item sub">
                Spent last year
                <span class="badge">
                  {{totals?.totalAmountLastYear?.total | currency:totals?.totalAmountLastYear?.currency:true:'1.2-2'}}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel panel-primary">
          <div class="panel-body">
            <div class="list-group">
              <a class="list-group-item sub">
                <span class="fa fa-user"></span> Top Recipient: {{lists?.topRecipients?.recipients[0]?.name}}
                <span class="badge">
                  {{lists?.topRecipients?.recipients[0]?.totalAmount 
                  | currency:lists?.topRecipients?.currency:true:'1.2-2'}}
                </span>
              </a>
              <a class="list-group-item sub">
                <span class="fa fa-money"></span> Top Donation: {{lists?.topDonations?.donations[0]?.recipient?.name}}
                <span class="badge">
                    {{lists?.topDonations?.donations[0]?.donation.amount 
                    | currency:lists?.topDonations?.donations[0]?.donation.currency:true:'1.2-2'}}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" *ngIf="chartDataLoaded">
        <div class="panel panel-primary">
          <div class="panel-body bg-info">
            <kendo-chart
              [categoryAxis]="{ categories: monthlyChartData.xLabels }"
              [seriesColors]="['#428bca', '#d9534f', '#5cb85c']">
              <kendo-chart-title [text]="getChartTitle()">
              </kendo-chart-title>
              <kendo-chart-y-axis>
                <kendo-chart-y-axis-item>
                </kendo-chart-y-axis-item>
              </kendo-chart-y-axis>
              <kendo-chart-series>
                <kendo-chart-series-item 
                  *ngIf="monthlyChartData.series === 'amount'"
                  type="column"
                  [data]="monthlyChartData.amounts">
                </kendo-chart-series-item>
                <kendo-chart-series-item 
                  *ngIf="monthlyChartData.series === 'number'"
                  type="line"
                  [data]="monthlyChartData.numbers">
                </kendo-chart-series-item>
              </kendo-chart-series>
            </kendo-chart>
            <div class="chartSelection">
              <label class="radio-inline">
                <input 
                  type="radio"
                  [value]="'amount'" 
                  [(ngModel)]="monthlyChartData.series">
                  Donation amount
              </label>
              <label class="radio-inline">
                <input 
                  type="radio"
                  [value]="'number'" 
                  [(ngModel)]="monthlyChartData.series">
                  Number of donations
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h1 class="panel-title"><span class="fa fa-money"></span> Donations</h1>
          </div>
          <div class="panel-body bg-info">
            <div class="row">
              <label class="control-label col-xs-4 text-right">
                # donations:
              </label>
              <div class="col-xs-8">
                {{totals?.countDonations}}
              </div>
            </div>
            <div class="row">
              <label class="control-label col-xs-4 text-right">
                Donation avg:
              </label>
              <div class="col-xs-8">
                {{avgDonation | currency:totals?.totalAmount?.currency:true:'1.2-2'}}
              </div>
            </div>
          </div>
        </div>
        <div class="panel panel-primary">
          <div class="panel-body bg-info">
            <div class="row">
              <label class="control-label col-xs-12">
                Top Donations:
              </label>
              <table class="table">
                <tbody>
                  <tr *ngFor="let donation of lists?.topDonations?.donations; let i = index">
                    <td>{{i+1}}</td>
                    <td>
                      {{donation.donation.dtPaid | date}}
                    </td>
                    <td>
                      {{donation.recipient.name}}
                    </td>
                    <td class="text-right">
                      {{donation.donation.amount | currency:donation.donation.currency:true:'1.2-2'}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h1 class="panel-title"><span class="fa fa-user"></span> Recipients</h1>
          </div>
          <div class="panel-body bg-info">
            <div class="row">
              <label class="control-label col-xs-4 text-right">
                # recipientstest:
              </label>
              <div class="col-xs-8">
                {{totals?.countRecipients}}
              </div>
            </div>
            <div class="row">
              <label class="control-label col-xs-4 text-right">
                Recipient avg:
              </label>
              <div class="col-xs-8">
                {{avgRecipient | currency:totals?.totalAmount?.currency:true:'1.2-2'}}
              </div>
            </div>
          </div>
        </div>
        <div class="panel panel-primary">
          <div class="panel-body bg-info">
            <div class="row">
              <label class="control-label col-xs-12">
                Top Recipients:
              </label>
              <table class="table">
                <tbody>
                  <tr *ngFor="let recipient of lists?.topRecipients?.recipients; let i = index">
                    <td>{{i+1}}</td>
                    <td>
                      {{recipient.name}}
                    </td>
                    <td class="text-right">
                      {{recipient.totalAmount | currency:lists?.topRecipients?.currency:true:'1.2-2'}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `,
  styles:[`
    #top .main {font-size:26px;}
    #top .main span.badge {font-size:26px;}
    #top .sub {font-size:18px;}
    #top .sub span.badge {font-size:18px;}
    .chartSelection {
      margin-top: 10px;
    }
  `]
})

export class Dashboard implements OnInit {
  lists: Object;
  totals: Object;
  monthlyChartData: Object;
  chartDataLoaded = false;
  avgDonation: number;
  avgRecipient: number;

  constructor(
    private dashboardService: DashboardService,
    private settingsService: SettingsService,
    private authService: AuthService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.settingsService.getDefaultCurrency().subscribe(
      currency => {
        this.dashboardService.getData('totals', currency).subscribe(
          totals => {
            this.totals = totals;
            this.calcTotals();
          },
          error => this.errorService.handleError(error)
        );
        this.dashboardService.getData('lists', currency).subscribe(
          lists => {this.lists = lists;},
          error => this.errorService.handleError(error)
        );
        this.dashboardService.getData('charts', currency).subscribe(
          charts => this.calcChartMonthData(charts['totalPerMonth']),
          error => this.errorService.handleError(error)
        );
      },
      error => this.errorService.handleError(error)
    );
  }

  calcTotals() {
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
  }

  calcChartMonthData(chart: Object) {
    let dt = moment().date(1),
        month: string,
        months: string[] = [],
        amounts: number[] = [],
        numbers: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

    for (let i = 0; i < 12; i++) {
      months[11-i] = dt.format('MMM') + ' ' + dt.year();
      month = dt.format('YYYYMM');
      chart['totals'].forEach(t => {
        if (t.month === month) {
          amounts[11-i] = t.donationAmount;
          numbers[11-i] = t.numberofDonations;
        }
      });
      dt = moment(dt).subtract(1, 'M');
    }

    this.monthlyChartData = {
      series: 'amount',
      currency: chart['currency'],
      xLabels: months,
      amounts,
      numbers
    };
    this.chartDataLoaded = true;
  }

  getChartTitle() {
    if (this.monthlyChartData && this.monthlyChartData['series'] === 'number') {
      return 'Number of donations per month';
    } else {
      return 'Donations total in ' + this.monthlyChartData['currency'] + ' per month';
    }
  }
}
