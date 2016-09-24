import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Donation} from '../models/donation.model';
import {AuthService} from './auth.service';

@Injectable()
export class DonationService {
  closeToView = new EventEmitter<Donation>();
  closeToDoc = new EventEmitter<Donation>();

  constructor(
    private _http: Http,
    private authService: AuthService
  ) {}

  getDonations(recipientId: string) {
    const token = this.authService.getToken();
    const url = '/api/donations' + (recipientId ? '/recipients/' + recipientId : '') + token;
    return this._http.get(url)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  getDonation(donationId: string) {
    const token = this.authService.getToken();
    const url = '/api/donations' + (donationId ? '/' + donationId : '') + token;
    return this._http.get(url)
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  addDonation(donation: Donation, recipientId: string) {
    const token = this.authService.getToken();
    const body = JSON.stringify({donation, recipientId});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('/api/donations' + token, body, {headers:headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  updateDonation(donation: Donation) {
    const token = this.authService.getToken();
    const body = JSON.stringify(donation);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.put('/api/donations' + token, body, {headers:headers})
      .map(response => donation) //server does not return latest state!
      .catch(error => Observable.throw(error));
  }

  removeDonation(donationId: string, recipientId: string) {
    const token = this.authService.getToken();
    console.log('deleting', '/api/donations/' + donationId + '/' + recipientId + token);
    return this._http.delete('/api/donations/' + donationId + '/' + recipientId + token)
      .map(response => response.json())
      .catch(error => Observable.throw(error));
  }

  closeDonation(targetState: string, donation: Donation = null) {
    switch (targetState) {
      case 'viewDonation':
        this.closeToView.emit(donation);
        break;
      case 'docDonation':
      default:
        this.closeToDoc.emit(donation);
        break;
    }
  }
}
