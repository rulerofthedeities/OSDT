import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DashboardService {

  constructor(private _http: Http) {}

  getTotals(currency: string) {
    const url = '/api/stats/totals/' + currency;
    return this._http.get(url)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  getLists(currency: string) {
    const url = '/api/stats/lists/' + currency;
    return this._http.get(url)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

}
