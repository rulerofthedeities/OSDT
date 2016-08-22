import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {CurrencyModel} from '../models/currency.model';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CurrencyService {

  constructor(private _http: Http) {}

  getCurrencies() {
    return this._http.get('/api/currencies')
      .map(response => {
        const data = response.json().obj;
        console.log(data);
        return data;
      })
      .catch(error => Observable.throw(error));
  }
}
