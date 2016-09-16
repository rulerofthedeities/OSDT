import {Component, OnInit} from '@angular/core';
import {CurrencyService} from '../services/currency.service';
import {ErrorService} from '../services/error.service';
import {Currency} from '../models/currency.model';

@Component({
  template: `
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
            <span [ngClass]="{'fa fa-check':currency.isDefault}"></span>
          </td>
          <td>{{currency.name}}</td>
          <td>{{currency.code}}</td>
          <td>{{currency.symbol}}</td>
          <td>
            <button 
              class="btn btn-default btn-sm"
              type="button" 
              [disabled]="currency.isDefault" 
              (click)="setDefault(currency._id)">
              Set as default
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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

  constructor(
    private currencyService: CurrencyService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies() {
    this.currencyService.getCurrencies()
      .subscribe(
        currencies => {this.currencies = currencies;},
        error => this.errorService.handleError(error)
      );
  }

  selectCurrencyIndex(i: number) {
    this.selectedCurrency = i;
  }

  setDefault(currencyId: string) {
    this.setDefaultInView(currencyId);
    this.currencyService.setDefault(currencyId).subscribe(
      currency => {
        if (currency._id !== currencyId) {
          this.setDefaultInView(currencyId);
        }
      },
      error => {
        this.errorService.handleError(error);
        this.setDefaultInView(currencyId);
      }
    );
  }

  setDefaultInView(currencyId:string) {
    this.currencies.filter(currency => currency.isDefault === true).forEach(currency => currency.isDefault = false);
    this.currencies.filter(currency => currency._id === currencyId).forEach(currency => currency.isDefault = true);
  }
}
