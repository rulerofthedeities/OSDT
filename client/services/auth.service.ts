import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {User} from '../models/user.model';

@Injectable()
export class AuthService {
  constructor (private http: Http) {}

  getToken(): string {
    return localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
  }

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/api/user/signup', body, {headers: headers})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/api/user/signin', body, {headers: headers})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  logout() {
    localStorage.clear();
    console.log('user logged out');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  checkEmail(email: string) {
    return this.http.get('/api/user/check?mail=' + email)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }
}
