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
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.get('/api/settings', {headers})
      .map(settings => settings.json().obj['defaultCurrency'])
      .catch(error => Observable.throw(error));
  }

  setDefaultCurrency(currencyCode: string) {
    const token = this.authService.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.patch('/api/currencies/' + currencyCode, null, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }
}
