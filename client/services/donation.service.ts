import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Donation} from '../models/donation.model';

@Injectable()
export class DonationService {

  constructor(private _http: Http) {}

  getDonations() {
    return this._http.get('/api/donations')
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  addDonation(donation: Donation) {
    const body = JSON.stringify(donation);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('/api/donations/add', body, {headers:headers})
      .map(response => response.json())
      .catch(error => Observable.throw(error));
  }
}
