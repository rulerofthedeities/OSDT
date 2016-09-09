import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Recipient} from '../models/recipient.model';

@Injectable()
export class RecipientService {
  closeToView = new EventEmitter<Recipient>();
  closeToDoc = new EventEmitter<Recipient>();

  constructor(private _http: Http) {}

  getRecipients(activeOnly: boolean) {
    let url = '/api/recipients';
    url += activeOnly ? '?active=1': '';
    return this._http.get(url)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  getRecipient(recipientId: string) {
    return this._http.get('/api/recipients/' + recipientId)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  addRecipient(recipient: Recipient) {
    recipient.name = this.toProperCase(recipient.name);//for sorting
    const body = JSON.stringify(recipient);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('/api/recipients', body, {headers:headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  updateRecipient(recipient: Recipient) {
    recipient.name = this.toProperCase(recipient.name);//for sorting
    const body = JSON.stringify(recipient);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.put('/api/recipients', body, {headers:headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  closeRecipient(targetState: string, recipient: Recipient = null) {
    switch (targetState) {
      case 'view':
        this.closeToView.emit(recipient);
        break;
      case 'doc':
      default:
        this.closeToDoc.emit(recipient);
        break;
    }
  }

  toProperCase(word: string): string {
    return word[0].toUpperCase() + word.slice(1);
  }
}
