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
    const url = '/api/donations' + (recipientId ? '/recipients/' + recipientId : '');
    const token = this.authService.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.get(url, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  getDonation(donationId: string) {
    const url = '/api/donations' + (donationId ? '/' + donationId : '');
    const token = this.authService.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.get(url, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  addDonation(donation: Donation, recipientId: string) {
    const token = this.authService.getToken();
    const body = JSON.stringify({donation, recipientId});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.post('/api/donations', body, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  updateDonation(donation: Donation) {
    const token = this.authService.getToken();
    const body = JSON.stringify(donation);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.put('/api/donations', body, {headers})
      .map(response => donation) //server does not return latest state!
      .catch(error => Observable.throw(error));
  }

  removeDonation(donationId: string, recipientId: string) {
    const token = this.authService.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this._http.delete('/api/donations/' + donationId + '/' + recipientId, {headers})
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
