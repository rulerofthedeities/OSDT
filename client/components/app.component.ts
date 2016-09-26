import {Component, OnInit} from '@angular/core';
import {ErrorService} from '../services/error.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'osdt',
  template: `
    <div class="container">
      <navbar></navbar>
      <router-outlet></router-outlet>
      <error-msg></error-msg>
    </div>
  `
})

export class AppComponent implements OnInit {

  constructor(
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.errorService.errorOccurred.subscribe(
      errorData => {
        if (errorData.message === 'jwt expired') {
          this.authService.logout();
        }
      }
    );
  }
}
