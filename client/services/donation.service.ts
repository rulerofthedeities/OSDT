import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Donation} from '../models/donation.model';

@Injectable()
export class DonationService {
  added = new EventEmitter<Donation>();

  constructor(private _http: Http) {}

  getDonations(recipientId: string) {
    const url = '/api/donations' + (recipientId ? '/' + recipientId : '');
    return this._http.get(url)
      .map(response => response.json().obj.map(donation => donation.donation))
      .catch(error => Observable.throw(error));
  }

  addDonation(donation: Donation, recipientId: string) {
    const body = JSON.stringify({donation, recipientId});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('/api/donations', body, {headers:headers})
      .map(response => {
        this.added.emit(response.json().obj);
        return response.json();
      })
      .catch(error => Observable.throw(error));
  }

  updateDonation(donation: Donation) {
    const body = JSON.stringify(donation);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.put('/api/donations', body, {headers:headers})
      .map(response => {
        //this.updated.emit(response.json().obj);
        return response.json();
      })
      .catch(error => Observable.throw(error));
  }
}
