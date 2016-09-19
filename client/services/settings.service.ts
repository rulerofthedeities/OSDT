import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SettingsService {

  constructor(
    private authService: AuthService,
    private _http: Http
  ) {}

  getDefaultCurrency() {
    const token = this.authService.getToken();
    return this._http.get('/api/settings' + token)
      .map(settings => settings.json().obj['defaultCurrency'])
      .catch(error => Observable.throw(error));
  }

  setDefaultCurrency(currencyCode: string) {
    const token = this.authService.getToken();
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.patch('/api/currencies/' + currencyCode + token, null, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }
}
