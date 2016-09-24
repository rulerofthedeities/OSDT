import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Recipient} from '../models/recipient.model';
import {AuthService} from './auth.service';

@Injectable()
export class RecipientService {
  closeToView = new EventEmitter<Recipient>();
  closeToDoc = new EventEmitter<Recipient>();

  constructor(
    private _http: Http,
    private authService: AuthService
  ) {}

  getRecipients(activeOnly: boolean) {
    let url = '/api/recipients';
    const token = this.authService.getToken(),
          active = activeOnly ? '&active=1': '';
    return this._http.get(url + token + active)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  getRecipient(recipientId: string) {
    const token = this.authService.getToken();
    return this._http.get('/api/recipients/' + recipientId + token)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  addRecipient(recipient: Recipient) {
    recipient.name = this.toProperCase(recipient.name);//for sorting
    const token = this.authService.getToken(),
          body = JSON.stringify(recipient),
          headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('/api/recipients' + token, body, {headers:headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  updateRecipient(recipient: Recipient) {
    recipient.name = this.toProperCase(recipient.name);//for sorting
    const token = this.authService.getToken(),
          body = JSON.stringify(recipient),
          headers = new Headers({'Content-Type': 'application/json'});
    return this._http.put('/api/recipients' + token, body, {headers:headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  setActiveState(recipientId, active) {
    const token = this.authService.getToken(),
          body = JSON.stringify({recipientId, active}),
          headers = new Headers({'Content-Type': 'application/json'});
    return this._http.patch('/api/recipients' + token, body, {headers:headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  closeRecipient(targetState: string, recipient: Recipient = null) {
    switch (targetState) {
      case 'viewRecipient':
        this.closeToView.emit(recipient);
        break;
      case 'docRecipient':
      default:
        this.closeToDoc.emit(recipient);
        break;
    }
  }

  toProperCase(word: string): string {
    return word[0].toUpperCase() + word.slice(1);
  }

  searchCategories(search: string) {
    const token = this.authService.getToken();
    return this._http.get('/api/cats' + token + '&search=' + search)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }
}
