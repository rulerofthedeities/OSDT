import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class DashboardService {

  constructor(
    private _http: Http,
    private authService: AuthService
  ) {}

  getTotals(currency: string) {
    const url = '/api/stats/totals/' + currency;
    const token = this.authService.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.get(url, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  getLists(currency: string) {
    const url = '/api/stats/lists/' + currency;
    const token = this.authService.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.get(url, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

}
