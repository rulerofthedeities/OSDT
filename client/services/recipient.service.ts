import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Recipient} from '../models/recipient.model';

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

  addRecipient(recipient: Recipient) {
    const body = JSON.stringify(recipient);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('/api/recipients', body, {headers:headers})
      .map(response => response.json())
      .catch(error => Observable.throw(error));
  }

  updateRecipient(recipient: Recipient) {
    const body = JSON.stringify(recipient);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.put('/api/recipients', body, {headers:headers})
      .map(response => response.json())
      .catch(error => Observable.throw(error));
  }
}
