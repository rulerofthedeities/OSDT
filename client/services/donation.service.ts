import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DonationService {

  constructor(private _http: Http) {}

  getDonations() {
    return this._http.get('/api/donations')
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }
}
