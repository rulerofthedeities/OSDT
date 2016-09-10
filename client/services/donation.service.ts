import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Donation} from '../models/donation.model';

@Injectable()
export class DonationService {
  closeToView = new EventEmitter<Donation>();
  closeToDoc = new EventEmitter<Donation>();

  constructor(private _http: Http) {}

  getDonations(recipientId: string) {
    const url = '/api/donations' + (recipientId ? '/recipients/' + recipientId : '');
    return this._http.get(url)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  getDonation(donationId: string) {
    const url = '/api/donations' + (donationId ? '/' + donationId : '');
    return this._http.get(url)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  addDonation(donation: Donation, recipientId: string) {
    const body = JSON.stringify({donation, recipientId});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('/api/donations', body, {headers:headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  updateDonation(donation: Donation) {
    const body = JSON.stringify(donation);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.put('/api/donations', body, {headers:headers})
      .map(response => donation) //server does not return latest state!
      .catch(error => Observable.throw(error));
  }

  closeDonation(targetState: string, donation: Donation = null) {
    switch (targetState) {
      case 'view':
        this.closeToView.emit(donation);
        break;
      case 'doc':
      default:
        this.closeToDoc.emit(donation);
        break;
    }
  }
}
