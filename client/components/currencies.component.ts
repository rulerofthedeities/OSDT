import {Component, OnInit} from '@angular/core';
import {CurrencyService} from '../services/currency.service';
import {ErrorService} from '../services/error.service';
import {Currency} from '../models/currency.model';

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

export class Currencies implements OnInit {
  currencies:Currency[] = [];

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
}
