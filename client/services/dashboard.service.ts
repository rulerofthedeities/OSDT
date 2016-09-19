import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class DashboardService {

  constructor(
    private _http: Http,
    private authService: AuthService
  ) {}

  getTotals(currency: string) {
    const token = this.authService.getToken();
    const url = '/api/stats/totals/' + currency + token;
    return this._http.get(url)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  getLists(currency: string) {
    const token = this.authService.getToken();
    const url = '/api/stats/lists/' + currency + token;
    return this._http.get(url)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

}
