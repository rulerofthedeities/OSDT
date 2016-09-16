import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {CurrencyService} from '../services/currency.service';

@Injectable()
export class CurrenciesResolver implements Resolve<any> {
  constructor(
    private currencyService: CurrencyService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.currencyService.getCurrencies();
  }
}
