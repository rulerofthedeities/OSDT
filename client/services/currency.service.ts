import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
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
    return this._http.get('/api/currencies' + token)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

}
