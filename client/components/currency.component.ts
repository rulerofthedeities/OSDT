import {Component, OnInit} from '@angular/core';
import {CurrencyService} from '../services/currency.service';
import {CurrencyModel} from '../models/currency.model';

@Component({
  template: `
    <div>Currencies</div>

    <ul>
      <li *ngFor="let currency of currencies">
        {{currency.name}}
      </li>
    </ul>
  `
})

export class Currency implements OnInit {
  currencies:CurrencyModel[] = [];

  constructor(
    private _currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this._getCurrencies();
  }

  private _getCurrencies() {
    this._currencyService.getCurrencies()
      .subscribe(
        currencies => {
            console.log('currencies', currencies);
            this.currencies = currencies;
        },
        error => {;}//this.errorService.handleError(error)
      );
  }
}
