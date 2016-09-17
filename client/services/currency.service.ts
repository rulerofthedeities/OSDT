import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CurrencyService {

  constructor(private _http: Http) {}

  getCurrencies() {
    return this._http.get('/api/currencies')
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  setDefault(currencyCode: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.patch('/api/currencies/' + currencyCode, null, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  getDefaultCurrency() {
    return this._http.get('/api/currencies')
      .map(response => {
        let defaultCurrency = response.json().obj.filter(currency => currency.isDefault === true);
        if (defaultCurrency.length > 0) {
          return defaultCurrency[0];
        } else {
          return null;
        }
      })
      .catch(error => Observable.throw(error));
  }

}
