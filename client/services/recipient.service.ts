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
    const active = activeOnly ? '?active=1': '',
          token = this.authService.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.get(url + active, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  getRecipient(recipientId: string) {
    const token = this.authService.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.get('/api/recipients/' + recipientId, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  addRecipient(recipient: Recipient) {
    recipient.name = this.toProperCase(recipient.name);//for sorting
    const body = JSON.stringify(recipient),
          token = this.authService.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.post('/api/recipients', body, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  updateRecipient(recipient: Recipient) {
    recipient.name = this.toProperCase(recipient.name);//for sorting
    const token = this.authService.getToken(),
          body = JSON.stringify(recipient);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.put('/api/recipients', body, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  setActiveState(recipientId, active) {
    const body = JSON.stringify({recipientId, active}),
          token = this.authService.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.patch('/api/recipients', body, {headers})
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
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.get('/api/cats?search=' + search, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }
}
