import {Component, OnInit} from '@angular/core';
import {CurrencyService} from '../services/currency.service';
import {SettingsService} from '../services/settings.service';
import {AuthService} from '../services/auth.service';
import {ErrorService} from '../services/error.service';
import {Currency} from '../models/currency.model';

@Component({
  template: `
  <section protected>
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">Default</th>
          <th>Name</th>
          <th>Code</th>
          <th>Symbol</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let currency of currencies; let i=index"
          on-mouseover="selectCurrencyIndex(i)">
          <td class="text-center">
            <span [ngClass]="{'fa fa-check':defaultCurrency == currency.code}"></span>
          </td>
          <td>{{currency.name}}</td>
          <td>{{currency.code}}</td>
          <td>{{currency.symbol}}</td>
          <td>
            <button 
              class="btn btn-default btn-sm"
              type="button" 
              [disabled]="currency.isDefault" 
              (click)="setDefault(currency.code)">
              Set as default
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  `,
  styles:[`
    .hover:hover {cursor:pointer;}
    tr:nth-child(odd) >td {
      background-color:#faebeb;
    }
    tr:nth-child(even) >td {
      background-color:#fdfdff;
    }
    tr:hover >td{
     background-color:#ccffcc;
    }
    .fa{
      font-size:1.2em;
      color:green;
    }
  `]
})

export class Currencies implements OnInit {
  currencies:Currency[] = [];
  selectedCurrency: number = null;
  defaultCurrency: string;

  constructor(
    private currencyService: CurrencyService,
    private settingsService: SettingsService,
    private authService:AuthService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.getCurrencies();
    }
  }

  getCurrencies() {
    this.settingsService.getDefaultCurrency().subscribe(
      defaultCurrency => {
        this.defaultCurrency = defaultCurrency;
        this.currencyService.getCurrencies().subscribe(
          currencies => {this.currencies = currencies;},
          error => this.errorService.handleError(error)
        );
      },
      error => this.errorService.handleError(error)
    );
  }

  selectCurrencyIndex(i: number) {
    this.selectedCurrency = i;
  }

  setDefault(currencyCode: string) {
    this.defaultCurrency = currencyCode;
    this.settingsService.setDefaultCurrency(currencyCode).subscribe(
      defaultCurrency => {this.defaultCurrency = defaultCurrency;},
      error => this.errorService.handleError(error)
    );
  }

}
