import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
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
}
