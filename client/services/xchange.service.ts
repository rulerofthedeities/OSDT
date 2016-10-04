import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class XchangeService {

  constructor(private _http: Http) {}

  getExchangeRate(timestamp: number, currencies: string[]) {
    const body = JSON.stringify({currencies});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('/api/xchange/' + timestamp, body, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }
}
