import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {CurrencyService} from '../services/currency.service';
import {AuthService} from '../services/auth.service';

@Injectable()
export class CurrenciesResolver implements Resolve<any> {
  constructor(
    private currencyService: CurrencyService,
    private authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (this.authService.isLoggedIn()) {
      return this.currencyService.getCurrencies();
    } else {
      return null;
    }
  }
}
