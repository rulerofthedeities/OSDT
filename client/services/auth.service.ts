import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {User, UserLocal, UserAccess} from '../models/user.model';

@Injectable()
export class AuthService {
  private accessLocal: UserAccess = null;

  constructor (
    private http: Http,
    private router: Router
  ) {}

  getToken(): string {
    return localStorage.getItem('km-osdt.token');
  }

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/api/user/signup', body, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error.json()));
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/api/user/signin', body, {headers})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error.json()));
  }

  logout() {
    this.clearStorage();
    this.router.navigate(['/auth/signin']);
  }

  isLoggedIn() {
    return localStorage.getItem('km-osdt.token') !== null;
  }

  getUserName() {
    return localStorage.getItem('km-osdt.userName');
  }

  setUserAccess(data: UserAccess) {
    this.accessLocal = data;
  }

  getUserAccess() {
    return this.accessLocal;
  }

  fetchUserAccess() {
    const token = this.getToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get('/api/user/access', {headers, body: ''})
      .map(response => response.json().obj)
      .catch(error => Observable.throw(error));
  }

  hasRole(role: string) {
    const access = this.getUserAccess();
    let hasRole = false;
    console.log(access);
    if (access && access.roles) {
      for(let i = 0; i < access.roles.length; i++) {
        if (access.roles[i] === role) {
          hasRole = true;
        }
      }
    }
    return hasRole;
  }

  storeUserData(data: UserLocal) {
    localStorage.setItem('km-osdt.token', data.token);
    localStorage.setItem('km-osdt.userId', data.userId);
    localStorage.setItem('km-osdt.userName', data.userName);
  }

  clearStorage() {
    localStorage.removeItem('km-osdt.token');
    localStorage.removeItem('km-osdt.userId');
    localStorage.removeItem('km-osdt.userName');
  }

}
