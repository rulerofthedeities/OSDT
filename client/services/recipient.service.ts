import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RecipientService {

  constructor(private _http: Http) {}

  getRecipients() {
    return this._http.get('/api/recipients')
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  getRecipient(recipientId: string) {
    return this._http.get('/api/recipients/' + recipientId)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }
}
