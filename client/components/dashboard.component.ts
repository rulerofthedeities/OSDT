import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {SettingsService} from '../services/settings.service';
import {ErrorService} from '../services/error.service';

@Component({
  template: `
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
      <div class="col-xs-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h1 class="panel-title"><span class="fa fa-money"></span> Donations</h1>
          </div>
          <div class="panel-body bg-info">
            <div class="row">
              <label class="control-label col-xs-3 text-right">
                # donations:
              </label>
              <div class="col-xs-9">
                {{totals?.countDonations}}
              </div>
            </div>
            <div class="row">
              <label class="control-label col-xs-3 text-right">
                Donation avg:
              </label>
              <div class="col-xs-9">
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
              <label class="control-label col-xs-3 text-right">
                # recipients:
              </label>
              <div class="col-xs-9">
                {{totals?.countRecipients}}
              </div>
            </div>
            <div class="row">
              <label class="control-label col-xs-3 text-right">
                Recipient avg:
              </label>
              <div class="col-xs-9">
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

    <!--
    <pre>{{totals|json}}</pre>
    <pre>{{lists|json}}</pre>
    -->
  `,
  styles:[`
    #top .main {font-size:32px;}
    #top .main span.badge {font-size:32px;}
    #top .sub {font-size:24px;}
    #top .sub span.badge {font-size:24px;}
  `]
})

export class Dashboard implements OnInit {
  lists: Object;
  totals: Object;
  avgDonation: number;
  avgRecipient: number;

  constructor(
    private dashboardService: DashboardService,
    private settingsService: SettingsService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.settingsService.getDefaultCurrency().subscribe(
      currency => {
        this.dashboardService.getTotals(currency.code).subscribe(
          totals => {this.totals = totals;this.calcTotals();},
          error => this.errorService.handleError(error)
        );
        this.dashboardService.getLists(currency.code).subscribe(
          lists => {this.lists = lists;},
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
}
