import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class CurrencyService {

  constructor(
    private _http: Http,
    private authService: AuthService
  ) {}

  getCurrencies() {
    const token = this.authService.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.get('/api/currencies', {headers, body: ''})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

}
